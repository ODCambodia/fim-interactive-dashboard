 

var  OpenStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

    Stadia_AlidadeSmoothDark = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    Stadia_AlidadeSmooth = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    });

    Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

var map = L.map('map', {
    zoom: 5,
    layers: [OpenStreetMap, Stadia_AlidadeSmoothDark, Stadia_AlidadeSmooth, Esri_WorldImagery]
});

var baseMaps = {
    "Stadia Alidade Smooth Dark": Stadia_AlidadeSmoothDark,
    "Stadia Alidade Smooth": Stadia_AlidadeSmooth,
    "Esri World Imagery": Esri_WorldImagery,
    "Open Street Map": OpenStreetMap,
};

L.control.layers(baseMaps).addTo(map);

var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
var osm = new L.TileLayer(osmUrl, {
    minZoom: 20,
    maxZoom: 18,
    attribution: osmAttrib
});

map.addLayer(osm);
map.setView(new L.LatLng(12.5657, 104.9910), 7);
var osm2 = new L.TileLayer(osmUrl, {
    minZoom: 4,
    maxZoom: 13,
    attribution: osmAttrib
});
var miniMap = new L.Control.MiniMap(osm2, {
    toggleDisplay: true, collapsedWidth: 20, collapsedHeight: 20
}).addTo(map);


var ndx;
    d3.csv("data/fim.csv").then(function(old_data) {
    array_nat = []
    array_note_co = []
    array_data_c = []
    array_cap_inv_m = []
    array_cap_inv1 = []
    array_cap_invm1 = []
    array_dev_pro = []
    array_pro_dev = []
    array_dir_name = []
    array_nat_pro = []
    job_creat = []
    job_creat1 = []
    array_sta_oper = []
    array_eia_rep = []
    array_com_type = []
    array_r_cdc = []
    array_reference = []
    array_cap_inv = []
    for (var i = 0; i < old_data.length; i++) {
        var array = old_data[i].nat.replace(/\s*\,\s*/g, ",").trim().split(",");
        var array_1 = old_data[i].note_co.replace(/\s*\,\s*/g, ",").trim().split(",");
        var array_2 = old_data[i].data_c.replace(/\s*\,\s*/g, ",").trim().split(",");
        var array_3 = old_data[i].cap_inv_m.replace(/\s*\,\s*/g, ",").trim().split(",");
        var array_4 = old_data[i].dev_pro.replace(/\s*\,\s*/g, ",").trim().split(",");
        var array_5 = old_data[i].pro_dev.replace(/\s*\,\s*/g, ",").trim().split(",");
        var array_6 = old_data[i].nat_pro.replace(/\s*\,\s*/g, ",").trim().split(",");
        // var array_7 = old_data[i].job_creat.replace(/\s*\,\s*/g, ",").trim().split(",");
        var array_8 = old_data[i].sta_oper.replace(/\s*\,\s*/g, ",").trim().split(",");
        var array_9 = old_data[i].dir_name.replace(/\s*\,\s*/g, ",").trim().split(",");
        var array_10 = old_data[i].eia_rep.replace(/\s*\,\s*/g, ",").trim().split(",");
        var array_11 = old_data[i].com_type.replace(/\s*\,\s*/g, ",").trim().split(",");
        var array_12 = old_data[i].r_cdc.replace(/\s*\,\s*/g, ",").trim().split(",");
        var array_13 = old_data[i].reference.replace(/\s*\;\s*/g, ";").trim().split(";");
        var array_14 = old_data[i].cap_inv.replace(/\s*\;\s*/g, ";").trim().split(";");
        var array_15 = old_data[i].cap_invm1.replace(/\s*\;\s*/g, ";").trim().split(";");
        array_nat.push(array);
        array_note_co.push(array_1);
        array_data_c.push(array_2);
        array_cap_inv_m.push(array_3);
        array_dev_pro.push(array_4);
        array_pro_dev.push(array_5);
        array_nat_pro.push(array_6);
        // array_job_creat.push(array_7);
        // array_sta_oper.push(array_8);
        array_dir_name.push(array_9);
        array_eia_rep.push(array_10);
        array_com_type.push(array_11);
        array_r_cdc.push(array_12);
        array_reference.push(array_13);
        array_cap_inv.push(array_14);
        array_cap_invm1.push(array_15);
    };
    var data = []
    for (var i = 0; i < old_data.length; i++) {
        data.push({
            sector: old_data[i].sector,
            pro_loc: old_data[i].pro_loc,
            nat: array_nat[i],
            note_co: array_note_co[i],
            data_c: old_data[i].data_c,
            lat: old_data[i].lat,
            long: old_data[i].long,
            cap_inv_m: array_cap_inv_m[i],
            cap_invm1: array_cap_invm1[i],
            dev_pro: array_pro_dev[i],
            pro_dev: array_dev_pro[i],
            nat_pro: array_nat_pro[i],
            job_creat: old_data[i].job_creat,
            job_creat1: old_data[i].job_creat1,
            sta_oper: old_data[i].sta_oper,
            dir_name: old_data[i].dir_name,
            eia_rep: array_eia_rep[i],
            com_type: array_com_type[i],
            r_cdc: array_r_cdc[i],
            reference: array_reference[i],
            cap_inv: array_cap_inv[i],

        });
    };

    // console.log(data);

    // function remove_empty_bins(source_group) {
    //     return {
    //         all: function() {
    //             return source_group.all().filter(function(d) {
    //                 return d.value != 0;
    //             });
    //         }
    //     };
    // }


    ndx = crossfilter(data);

    var locationDim = ndx.dimension(function(d) {
        return [d["lat"],
            d["long"],
            d["sector"],
            d["pro_loc"],
            d["nat"],
            d["note_co"],
            d["data_c"],
            d["cap_inv_m"],
            d["dev_pro"],
            d["pro_dev"],
            d["nat_pro"],
            d["dir_name"],
            d["job_creat"],
            d["job_creat1"],
            d["sta_oper"],
            d["eia_rep"],
            d["com_type"],
            d["r_cdc"],
            d["reference"],
            d["cap_inv"],
            d["cap_invm1"],

        ];
    });

    var sectorDim = ndx.dimension(function(d) {
        return d["sector"];
    });

    var pro_locDim = ndx.dimension(function(d) {
        return d["pro_loc"];
    });
    var natDim = ndx.dimension(function(d) {
        return d["nat"];
    }, true);

    var note_coDim = ndx.dimension(function(d) {
        return d["note_co"];
    }, true);

    var data_cDim = ndx.dimension(function(d) {
        return d["data_c"];
    });
    var data_cDim1 = ndx.dimension(function(d) {
        return d["data_c"];
    });
    var cap_inv_mDim = ndx.dimension(function(d) {
        return d["cap_inv_m"];
    });
    var dev_proDim = ndx.dimension(function(d) {
        return d["dev_pro"];
    });
    var pro_devDim = ndx.dimension(function(d) {
        return d["pro_devm"];
    });
    var dir_nameDim = ndx.dimension(function(d) {
        return d["dir_name"];
    });
    var nat_proDim = ndx.dimension(function(d) {
        return d["nat_pro"];
    });
    var job_creatDim = ndx.dimension(function(d) {
        return d["job_creat"];
    });
    var star_operDim = ndx.dimension(function(d) {
        return d["star_oper"];
    });
    var eia_repDim = ndx.dimension(function(d) {
        return d["eia_rep"];
    });
    var com_typeDim = ndx.dimension(function(d) {
        return d["com_type"];
    });
    var r_cdcDim = ndx.dimension(function(d) {
        return d["r_cdc"];
    });
    var referenceDim = ndx.dimension(function(d) {
        return d["reference"];
    });
    var cap_invDim = ndx.dimension(function(d) {
        return d["cap_inv"];
    });

    var allDim = ndx.dimension(function(d) {
        return d;
    });
        //capital investment group
    var cap_invGroup = sectorDim.group().reduceSum(function(d) {
        return d.cap_inv/1000000;
        });
        


    var groupname = "marker-select";
    var all = ndx.groupAll();
    var locationGroup = locationDim.group().reduce(function(p, v) {
            p["lat"] = v["lat"]
            p["long"] = v["long"]
            p["sector"] = v["sector"]
            p["pro_loc"] = v["pro_loc"]
            p["nat"] = v["nat"]
            p["dir_name"] = v["dir_name"]
            p["note_co"] = v["note_co"]
            p["data_c"] = v["data_c"]
            p["cap_inv_m"] = v["cap_inv_m"]
            p["cap_invm1"] = v["cap_invm1"]
            p["dev_pro"] = v["dev_pro"]
            p["pro_dev"] = v["pro_dev"]
            p["nat_pro"] = v["nat_pro"]
            p["job_creat"] = v["job_creat"]
            p["job_creat1"] = v["job_creat1"]
            p["star_oper"] = v["star_oper"]
            p["eia_rep"] = v["eia_rep"]
            p["com_type"] = v["com_type"]
            p["r_cdc"] = v["r_cdc"]
            p["reference"] = v["reference"]
            p["cap_inv"] = v["cap_inv"]
                ++p.count;
            return p;
        },
        function(p, v) {
            --p.count;
            return p;
        },
        function() {
            return {
                count: 0
            };
        });

    var sectorGroup = sectorDim.group().reduceCount();
    var pro_locGroup = pro_locDim.group().reduceCount();
    var nat_proGroup = nat_proDim.group().reduceCount();
    var data_cGroup = data_cDim.group().reduceCount();
    var job_creatGroup = job_creatDim.group().reduceCount();
    var cap_inv_mGroup = cap_inv_mDim.group().reduceCount();




    // nonEmptyHist_year = remove_empty_bins(data_cGroup1)

    var sectorChart = dc.pieChart('#chart-ring-sector', groupname);
    var pro_locChart = dc.pieChart('#chart-ring-pro_loc', groupname);
    var nat_proChart = dc.rowChart("#chart-ring-nat_pro", groupname);
    var nat_proAxisChart = new dc.axisChart('#nat_pro-row-axis', groupname);
    var job_creatChart = dc.pieChart('#chart-ring-job_creat', groupname);
    // var cap_inv_mChart = dc.barChart("#chart-ring-cap_inv_m", groupname);
    var data_cChart = dc.pieChart('#chart-ring-data_c', groupname);
    // var sectorSummaryChart = dc.pieChart('#chart-ring-cap_inv', groupname);
    var capinvChart = dc.rowChart("#chart-ring-capinv", groupname);
    // var capinvAxisChart = new dc.axisChart('#capinv-row-axis', groupname);

    var dataTableCount = dc.dataCount('.dc-dataTable-count', groupname);
    var dataTable = dc_datatables.datatable('#data-table', groupname);
    var dataCount = dc.dataCount('.dc-dataTitle-count', groupname);

    var d3SchemeCategory20c = ['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#e6550d', '#fd8d3c', '#fdae6b', '#fdd0a2', '#31a354', '#74c476', '#a1d99b', '#c7e9c0', '#756bb1', '#9e9ac8', '#bcbddc', '#dadaeb', '#636363', '#969696', '#bdbdbd', '#d9d9d9']

    var paperMarkers = dc_leaflet.markerChart("#cluster-map-anchor", groupname)
        .dimension(locationDim)
        .group(locationGroup)
        .map(map)
        .valueAccessor(function(kv) {
            return kv.value.count;
        })
        .locationAccessor(function(kv) {
            return [kv.value.lat, kv.value.long];
        })
        .showMarkerTitle(false)
        .fitOnRender(true)
        .fitOnRedraw(true)
        .filterByArea(true)
        .cluster(true)
        .popup(function(kv, marker) {

            return "<dt><span style='font-weight:bolder'>Sector: </span> </dt> <dd>" + kv.value.sector + "<dd>" +
            "<dt><span style='font-weight:bolder'>Development project: </span> </dt> <dd>" + kv.value.dev_pro + "<dd>" +
            "<dt><span style='font-weight:bolder'>Project developer: </span> </dt> <dd>" + kv.value.pro_dev + "<dd>"+
            "<dt><span style='font-weight:bolder'>Capital Investment: </span> </dt> <dd>" + kv.value.cap_inv + "<dd>"+
            "<dt><span style='font-weight:bolder'>Nationality of project (Country) : </span> </dt> <dd>" + kv.value.nat_pro + "<dd>"+
            "<dt><span style='font-weight:bolder'>Job creation: </span> </dt> <dd>" + kv.value.job_creat1 + "<dd>" +
            "<dt><span style='font-weight:bolder'>Started year : </span> </dt> <dd>" + kv.value.sta_oper + "<dd>"+
            "<dt><span style='font-weight:bolder'>Director name : </span> </dt> <dd>" + kv.value.dir_name + "<dd>"+
            "<dt><span style='font-weight:bolder'>EIA report : </span> </dt> <dd>" + kv.value.eia_rep + "<dd>"+
            "<dt><span style='font-weight:bolder'>Company type : </span> </dt> <dd>" + kv.value.com_type + "<dd>"+
            "<dt><span style='font-weight:bolder'>EIA report : </span> </dt> <dd>" + kv.value.eia_rep + "<dd>"+
            "<dt><span style='font-weight:bolder'>Registered CDC : </span> </dt> <dd>" + kv.value.r_cdc + "<dd>"+
            "<dt><span style='font-weight:bolder'>Project location: </span> </dt> <dd>" + kv.value.pro_loc + "<dd>"+
            "<dt><span style='font-weight:bolder'>Data classification : </span> </dt> <dd>" + kv.value.data_c + "<dd>"+
            "<dt><span style='font-weight:bolder'>Reference: </span> </dt> <dd>" + kv.value.reference + "<dd>"
        })
        .clusterOptions({
            spiderfyOnMaxZoom: true,
            spiderLegPolylineOptions: {
                weight: 3,
                color: '#000',
                opacity: 0.8
            }
        });

    sectorChart
        .width(300)
        .height(280)
        // .slicesCap(400)
        .innerRadius(40)
        .externalLabels(200)
        // .externalRadiusPadding(30)
        // .drawPaths(true)
        .dimension(sectorDim)
        .group(sectorGroup)
        .legend(new dc.HtmlLegend()
            .container('#sector-legend')
            .horizontal(false)
            .highlightSelected(true));

    // sectorSummaryChart
    //     .width(300)
    //     .height(280)
    //     .externalLabels(200)
    //     .dimension(sectorDim)
    //     .innerRadius(40)
    //     .group(cap_invGroup)
    //     .legend(new dc.HtmlLegend()
    //         .container('#newsector-legend')
    //         .horizontal(false)
    //         .highlightSelected(true));

    data_cChart
        .width(300)
        .height(280)
        .externalLabels(200)
        .innerRadius(40)
        .dimension(data_cDim)
        .group(data_cGroup)
        .ordinalColors([ '#A6F230', '#7015E8', '#15E8AD'])
        .legend(new dc.HtmlLegend()
            .container('#data_c-legend')
            .horizontal(false)
            .highlightSelected(true));

    pro_locChart
        .width(300)
        .height(280)
        .externalLabels(200)
        .dimension(pro_locDim)
        .innerRadius(40)
        .group(pro_locGroup)
        .legend(new dc.HtmlLegend()
            .container('#pro_loc-legend')
            .horizontal(false)
            .highlightSelected(true))
            
    job_creatChart
        .width(300)
        .height(280)
        .externalLabels(200)
        .dimension(job_creatDim)
        .innerRadius(40)
        .ordinalColors(['#ff0000', '#A6F230', '#157EE8', '#c6dbef', '#dadaeb'])
        .group(job_creatGroup)
        .legend(new dc.HtmlLegend()
            .container('#job_creat-legend')
            .horizontal(false)
            .highlightSelected(true))
    
    // cap_inv_mChart
    //     .width(320)
    //     .height(380)
    //     .x(d3.scaleLinear().domain([1,90]))
    //     .brushOn(true)
    //     .controlsUseVisibility(true)
    //     .transitionDuration(0)
    //     .barPadding(0.2)
    //     .xUnits(dc.units.ordinal)
    //     .elasticX(true)
    //     .elasticY(true)
    //     // .centerBar(true)
    //     .yAxisLabel("Count on Capital Investment in million USD")
    //     .dimension(cap_inv_mDim)
    //     .group(cap_inv_mGroup)
    //     .round(Math.floor)
    //     .x(d3.scaleLinear().domain([-25, 25]))
    //     .renderHorizontalGridLines(true)
    //     // .label(d => d.cap_inv.split('.')[1])
    //     .renderlet(function(chart) {
    //         chart.selectAll("g.x text")
    //             .attr('dx', '0')
    //             .attr('dy', '10')
    //     })

    
    // cap_inv_mChart
    //     .width(1200)
    //     .height(380)
    //     .brushOn(false)
    //     .controlsUseVisibility(true)
    //     .transitionDuration(0)
    //     .barPadding(0.1)
    //     .x(d3.scaleBand())
    //     .xUnits(dc.units.ordinal)
    //     .elasticX(true)
    //     .elasticY(true)
    //     .centerBar(true)
    //     .yAxisLabel("Summary on Capital Investment in million USD")
    //     .dimension(sectorDim)
    //     .group(cap_invGroup)
    //     .ordinalColors(['#215979'])
    //     .round(Math.floor)   
    //     .renderLabel(true)     
    //     .renderHorizontalGridLines(true)
    //     .renderVerticalGridLines(true)
    //     .renderlet(function(chart) {
    //         chart.select('.axis.x')
    //             .attr("text-anchor", "end")
    //             .selectAll("text")
    //             .attr("transform", "rotate(90)")
    //             .attr("dy", "-20em")
    //             .attr("dx", "-1em")
        
    //     });

    nat_proChart
        .width(300)
        .height(380)
        .margins({
            left: 10,
            top: 15,
            right: 10,
            bottom: 0
        })
        .dimension(nat_proDim)
        .group(nat_proGroup)
        .elasticX(true)
        .colors("#1ca3ec")
        .ordering(function(d) {
            return -d.value;
        })
        .xAxis().ticks(15)

    nat_proAxisChart
        .margins({
            left: 10,
            top: 0,
            right: 10,
            bottom: 10
        })
        .height(50)
        .width(300)
        .dimension(nat_proDim)
        .group(nat_proGroup)
        .elastic(true);

    capinvChart
        .width(300)
        .height(380)
        .margins({
            left: 10,
            top: 15,
            right: 10,
            bottom: 0
        })
        .dimension(sectorDim)
        // .ordinalColors(['#ff0000', '#A6F230', '#157EE8', '#c6dbef', '#dadaeb'])
        .group(cap_invGroup)
        .elasticX(true)
        .colors("#215979")
        .ordering(function(d) {
            return -d.value;
        })
        .xAxis().ticks(15)

    // capinvAxisChart
    //     .margins({
    //         left: 10,
    //         top: 0,
    //         right: 10,
    //         bottom: 10
    //     })
    //     .height(50)
    //     .width(300)
    //     .dimension(sectorDim)
    //     .group(cap_invGroup)
    //     .renderLabel(true)
    //     .elastic(true)
    //     .on('renderlet', function (chart) {
    //         chart.selectAll("g.row  text")
    //             .style("text-anchor", "end")
    //             .call(function (t) {
    //                 t.each(function (d) {
    //                     var self = d3.select(this);
    //                     var text = self.text();
    //                     if (text.length > 14) {
    //                         self.text('');
    //                         text = text.substring(0, 14) + '..';
    //                         self.text(text);
    //                     }
    //                 })
    //             });
    //     })    

    dataCount
        .dimension(ndx)
        .group(all);

    dataTableCount
        .dimension(ndx)
        .group(all)

    dataTable
        .dimension(allDim)
        .group(function(d) {
            return 'Data Counts';
        })
        .size(10)
        .columns([{
                label: 'Sector',
                type: 'string',
                format: function(d) {
                    return d["sector"];
                }

            }, {
                label: 'Development project',
                type: 'string',
                format: function(d) {
                    return d["dev_pro"];
                }
            
            }, {
                label: 'Project developer',
                type: 'string',
                format: function(d) {
                    return d["pro_dev"];
                }
            
            }, {
                label: 'Capital Investment (Million USD)',
                type: 'string',
                format: function(d) {
                    return d["cap_invm1"];
                }

            }, {
                label: 'Nationality of Project (Country)',
                type: 'string',
                format: function(d) {
                    return d["nat_pro"];
                }

            }, {
                label: 'Job Creation',
                type: 'num',
                format: function(d) {
                    return d["job_creat1"];
                }    
            
            }, {
                label: 'Started (Year)',
                type: 'num',
                format: function(d) {
                    return d["sta_oper"];
                }
            
            }, {
                label: 'Director Name',
                type: 'string',
                format: function(d) {
                    return d["dir_name"];
                }

            }, {
                label: 'EIA Report',
                type: 'string',
                format: function(d) {
                    return d["eia_rep"];
                }
            
            }, {
                label: 'Company type',
                type: 'string',
                format: function(d) {
                    return d["com_type"];
                }

            }, {
                label: 'Registered CDC number',
                type: 'string',
                format: function(d) {
                    return d["r_cdc"];
                }

            }, {
                label: ' Project Location',
                type: 'string',
                format: function(d) {
                    return d["pro_loc"];
                }

            }, {
                label: 'Data Classification',
                type: 'string',
                format: function(d) {
                    return d["data_c"];
                }
            
            }, {
                label: 'Reference',
                type: 'string',
                format: function(d) {
                    return d["reference"];
                }
            
            }
        ])


    .sortBy(function(d) {
            return d.Sector;
        })
        .order(d3.ascending)
        .options({
            "scrollX": true
        })
        .on('renderlet', function(table) {
            table.selectAll('.dc-table-group').classed('info', true);
        });

    d3.selectAll('a#all').on('click', function() {
        dc.filterAll(groupname);
        dc.renderAll(groupname);
    });

    d3.selectAll('a#sector').on('click', function() {
        sectorChart.filterAll(groupname);
        dc.redrawAll(groupname);
    });
    d3.selectAll('a#pro_loc').on('click', function() {
        pro_locChart.filterAll(groupname);
        dc.redrawAll(groupname);
    });
    d3.selectAll('a#nat').on('click', function() {
        natChart.filterAll(groupname);
        dc.redrawAll(groupname);
    });

    d3.selectAll('a#note_co').on('click', function() {
        note_coChart.filterAll(groupname);
        dc.redrawAll(groupname);
    });

    d3.selectAll('a#data_c').on('click', function() {
        data_cChart.filterAll(groupname);
        dc.redrawAll(groupname);
    });
    // d3.selectAll('a#data_c').on('click', function() {
    //     data_cChart1.filterAll(groupname);
    //     dc.redrawAll(groupname);
    // });

    $("#mapReset").on('click', function() {
        paperMarkers.map().setView([12.5657, 104.9910], 3);
    });

    dc.renderAll(groupname);
    dc.redrawAll(groupname);

});
$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
});

var offset = 70;
$('.navbar li a').click(function(event) {
    event.preventDefault();
    $($(this).attr('href'))[0].scrollIntoView();
    scrollBy(0, -offset);
});

var navOffset = $('.navbar').height();

$('.navbar li a').click(function(event) {
    var href = $(this).attr('href');

    event.preventDefault();
    window.location.hash = href;

    $(href)[0].scrollIntoView();
    window.scrollBy(0, -navOffset);
});
