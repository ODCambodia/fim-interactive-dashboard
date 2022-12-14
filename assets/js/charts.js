const url = 'https://data.opendevelopmentcambodia.net/en/api/3/action/datastore_search';
const resourceId = '50d26fc8-e451-4486-9252-6cdf09a34fea';
const limit = 500;

const datasetUrl = url + '?resource_id=' + resourceId + '&limit=' + limit;

let projects = [];

const chartHeightScale  = 0.58;
const pieXscale         = 1.41;
const pieRscale         = chartHeightScale * 0.5;

function setHeight(chart) {
  return chart.width() * chartHeightScale;
}

try {
  d3.json(datasetUrl).then(data => {
    let records = data.result.records;

    records.forEach(record => {
      let value ={
        project_type        : record.dev_pro,
        developer           : record.pro_dev,
        project_url         : record.link_p,
        sector              : record.sector,
        investment_mm       : record.cap_inv_m,
        investment          : record.cap_inv,
        nationality         : record.nat_pro,
        job_creation        : record.job_creat,
        year_start          : record.sta_oper,
        province            : record.pro_loc,
        data_classification : record.data_c,
        reference           : record.reference,
        lat                 : record.lat,
        lng                 : record.long,
      }

      projects.push(value);
    })

    return projects;
  }).then(projects => {
    let ndx = crossfilter(projects);
    let all = ndx.groupAll();

    // Dimension
    let projectsByCoordinate = ndx.dimension(d => {
      let projectInfo = [
        d.lat,
        d.lng,
      ];

      return projectInfo;
    })

    let sectorDimension = ndx.dimension(d => d.sector);
    let investmentSectorDimension = ndx.dimension( d => d.sector );
    let investmentDimension = ndx.dimension(d => d.investment_mm);
    let provinceDimension = ndx.dimension(d => d.province);
    let nationalityDimension = ndx.dimension(d => d.nationality);

    let projectDimension = ndx.dimension(d => [
      d.sector,
      d.developer,
      d.project_type,
      d.investment_mm,
      d.nationality,
      d.year_start,
    ])

    // Group
    let coordinateGroup = projectsByCoordinate.group().reduce((p, v) => {
      p.lat           = v.lat;
      p.lng           = v.lng;
      p.project_type  = v.project_type;
      p.developer     = v.developer;
      p.project_url   = v.project_url;
      p.sector        = v.sector;
      p.investment_mm = v.investment_mm;
      p.nationality   = v.nationality;
      p.province      = v.province;

      ++p.count;
      return p;
    }, (p, v) => {
      --p.count;
      return p;
    }, () => {
      return {count: 0};
    });

    let sectorGroup = sectorDimension.group().reduceCount();
    let investmentGroup = sectorDimension.group().reduceSum(d => d.investment_mm);
    let provinceGroup = provinceDimension.group().reduceCount();
    let investmentNationalityGroup = nationalityDimension.group().reduceSum(d => d.investment_mm);
    let projectGroup = projectDimension.group();
  
    // Charts
    let projectsByCoordinateMapChart = dc_leaflet.markerChart('#cluster-map-anchor');
    
    let projectsBySectorPieChart = dc.pieChart('#projects-by-sector-pie-chart');
    let projectsByProvincePieChart = dc.pieChart('#projects-by-province-pie-chart');

    let investmentBySectorRowChart = dc.rowChart('#investment-by-sector-row-chart');
    let investmentByNationalityRowChart = dc.rowChart('#investment-by-nationality-row-chart');
    // let investmentByNationalityBubbleCloud = dc.bubbleCloud('#investment-by-nationality-bubble-cloud')

    projectsByCoordinateMapChart
      .dimension(projectsByCoordinate)
      .group(coordinateGroup)
      .map(map)
      .valueAccessor(d => d.value.count)
      .showMarkerTitle(false)
      .fitOnRender(true)
      .fitOnRedraw(true)
      .filterByArea(true)
      .cluster(true)
      .popup(d => {
        return '<p>Developer: <a target="_blank" href="' + d.value.project_url + '">' + d.value.developer + '</a></p>' +
              '<p>Capital Investment: USD ' + d3.format(',.2f')(d.value.investment_mm) + ' million</p>' +
              '<p>Development project: ' + d.value.project_type + '</p>' +
              '<p>Sector: ' + d.value.sector + '</p>';
      })
      .clusterOptions({
        spiderfyOnMaxZoom: true,
        spiderLegPolylineOptions: {
          weight: 1,
          color: '#000',
          opacity: 0.8,
        }
      })

    projectsBySectorPieChart
      .dimension(sectorDimension)
      .group(sectorGroup)
      .useViewBoxResizing(true)
      .height(setHeight(projectsBySectorPieChart))
      .cx(projectsBySectorPieChart / pieXscale)
      .radius(projectsBySectorPieChart * pieRscale)
      .slicesCap(5)
      .innerRadius(40)
      .externalLabels(200)
      .legend(dc.legend()
        .y(Math.round(projectsBySectorPieChart.height()) * 0.02, 1)
        .gap(Math.round(projectsBySectorPieChart.height() * 0.02, 1))
      )

    investmentBySectorRowChart
      .dimension(investmentSectorDimension)
      .group(investmentGroup)
      .height(setHeight(investmentBySectorRowChart))
      .rowsCap(8)
      .title(d => 'USD ' + d3.format(',.2f')(d.value) + ' million')
      .useViewBoxResizing(true)
      .elasticX(true)
      .ordering( d => -d.value )
      .xAxis().ticks(5)

    projectsByProvincePieChart
      .dimension(provinceDimension)
      .group(provinceGroup)
      .height(setHeight(projectsByProvincePieChart))
      .cx(projectsByProvincePieChart / pieXscale)
      .radius(projectsByProvincePieChart * pieRscale)
      .slicesCap(5)
      .useViewBoxResizing(true)
      .innerRadius(40)
      .externalLabels(200)
      .legend(dc.legend()
        .y(Math.round(projectsByProvincePieChart.height()) * 0.02, 1)
        .gap(Math.round(projectsByProvincePieChart.height() * 0.02, 1))
      )

    investmentByNationalityRowChart
      .dimension(nationalityDimension)
      .group(investmentNationalityGroup)
      .useViewBoxResizing(true)
      .height(setHeight(investmentByNationalityRowChart))
      .colors('#04544F')
      .rowsCap(8)
      .title(d => 'USD ' + d3.format(',.2f')(d.value) + ' million')
      .elasticX(true)
      .ordering( d => -d.value )
      .xAxis().ticks(5)

    // investmentByNationalityBubbleCloud
    //   .dimension(nationalityDimension)
    //   .group(investmentNationalityGroup)
    //   .width(500)
    //   .height(500)
    //   .x(d3.scaleOrdinal())
    //   .r(d3.scaleLinear())
      // .radiusValueAccessor(d => d.value)

    // DataTables
    const datatableCount = dc.dataCount('.dc-datatable-count');
    const datatable = dc.tableview('#fim-datatable')

    const columns = [
      {
        title : 'Sector',
        data  : d => d.sector,
      },
      {
        title : 'Development Project',
        data  : d => d.project_type
      },
      {
        title : 'Developer',
        data  : d => d.developer,
      },
      {
        title : 'Nationality',
        data  : d => d.nationality,
      },
      {
        title : 'Capital Investment (Million USD)',
        data  : d => d.investment_mm,
      },
      {
        title : 'Start Year',
        data  : d => d.year_start,
      }
    ]

    datatableCount
      .crossfilter(ndx)
      .groupAll(all)

    datatable
      .dimension(projectDimension)
      .group(projectGroup)
      .columns(columns)
      .size(25)
      .enableColumnReordering(true)
      .enablePaging(true)
      .enablePagingSizeChange(true)
      .enableSearch(true)
      .enableAutoWidth(true)
      .fixedHeader(true)
      .enableScrolling(false)
      .scrollingOptions({
        scrollY: Infinity,
        scrollCollapse: true,
        deferRender: true,
      })
      .groupBy(d => d.sector)
      .showGroups(true)
      .select(true)
      .buttons(["pdf", "csv", "excel", "print"])

    dc.renderAll();
  })
} catch (error) {
  console.log(error)
}