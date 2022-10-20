const url = 'https://data.opendevelopmentcambodia.net/en/api/3/action/datastore_search';
const resourceId = '50d26fc8-e451-4486-9252-6cdf09a34fea';
const limit = 500;

const datasetUrl = url + '?resource_id=' + resourceId + '&limit=' + limit;

let projects = [];

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
    let investmentDimension = ndx.dimension(d => d.investment_mm);
    let provinceDimension = ndx.dimension(d => d.province);
    let nationalityDimension = ndx.dimension(d => d.nationality);

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

    // Charts
    let projectsByCoordinateMapChart = dc_leaflet.markerChart('#cluster-map-anchor');
    
    let projectsBySectorPieChart = dc.pieChart('#projects-by-sector-pie-chart');
    let projectsByProvincePieChart = dc.pieChart('#projects-by-province-pie-chart');

    let investmentBySectorRowChart = dc.rowChart('#investment-by-sector-row-chart');
    let investmentByNationalityRowChart = dc.rowChart('#investment-by-nationality-row-chart');

    projectsByCoordinateMapChart
      .dimension(projectsByCoordinate)
      .group(coordinateGroup)
      .map(map)
      .showMarkerTitle(false)
      .fitOnRender(true)
      .fitOnRedraw(true)
      .filterByArea(true)
      .cluster(false)
      .popup(d => {
        return '<p>Developer: <a target="_blank" href="' + d.value.project_url + '">' + d.value.developer + '</a></p>' +
              '<p>Capital Investment: USD ' + d.value.investment_mm + ' million</p>' +
              '<p>Development project: ' + d.value.project_type + '</p>' +
              '<p>Sector: ' + d.value.sector + '</p>';
      })

    projectsBySectorPieChart
      .dimension(sectorDimension)
      .group(sectorGroup)
      .width(300)
      .height(200)
      .slicesCap(5)
      .innerRadius(40)
      .externalLabels(200)
      .legend(new dc.HtmlLegend()
        .container('.sector-legend')
        .horizontal(false)
        .highlightSelected(true)
      )

    investmentBySectorRowChart
      .dimension(sectorDimension)
      .group(investmentGroup)
      .width(500)
      .height(280)
      .elasticX(true)
      .ordering( d => -d.value )
      .xAxis().ticks(5)

    projectsByProvincePieChart
      .dimension(provinceDimension)
      .group(provinceGroup)
      .slicesCap(5)
      .width(300)
      .height(200)
      .innerRadius(40)
      .externalLabels(200)
      .legend(new dc.HtmlLegend()
        .container('.province-legend')
        .horizontal(false)
        .highlightSelected(true)
      )

    investmentByNationalityRowChart
      .dimension(nationalityDimension)
      .group(investmentNationalityGroup)
      .width(500)
      .height(380)
      .colors("#215979")
      .elasticX(true)
      .ordering( d => -d.value )
      .xAxis().ticks(5)

    dc.renderAll();
  })
} catch (error) {
  console.log(error)
}