var year = []
var genre = []
var data_array = []
var terminate
var color_arr = ["#00429d", "#3761ab", "#73a2c6", "#93c4d2", "#b9e5dd", "#ffd3bf", "#ffa59e", "#f4777f", "#dd4c65", "#be214d", "#93003a", "#5e0000"]
var best_selling_per_year = []
var top_selling_id = []
var top_selling_color = []
var maximum_quantity = 0;
var bumper = 0;
var top_button_num_clicked = 0
var clicked_one = 0;
var clicked_two = 0;
var clicked_three = 0;
var clicked_four = 0;
var clicked_five = 0;
var clicked_six = 0;
var clicked_seven = 0;
var clicked_eight = 0;
var clicked_nine = 0;
var clicked_ten = 0;
var clicked_eleven = 0;
var clicked_twelve = 0;
var array_one = []
var array_two = []
var array_three = []
var array_four = []
var array_five = []
var array_six = []
var array_seven = []
var array_eight = []
var array_nine = []
var array_ten = []
var array_eleven = []
var array_twelve = []


var svg = d3.select("svg");

// DATA CLEANING

d3.csv("vgsales.csv").then(data=>{
    data.forEach(function(d){
        d.Year = Number(d.Year)
        d.NA_Sales = Number(d.NA_Sales)
        d.EU_Sales = Number(d.EU_Sales)
        d.JP_Sales = Number(d.JP_Sales)
        d.Other_Sales = Number(d.Other_Sales)
        d.Global_Sales = Number(d.Global_Sales)
    });

    var NaMax = d3.max(data, d => d.NA_Sales);
    var EuMax = d3.max(data, d => d.EU_Sales);
    var JpMax = d3.max(data, d => d.JP_Sales);
    var OtherMax = d3.max(data, d => d.Other_Sales);

    NayScale = d3.scaleLinear()
        .domain([0, NaMax])
        .range([700, 0])

    NaScale = d3.scaleLinear()
        .domain([0, NaMax])
        .range([0, 700])

    EuScale = d3.scaleLinear()
        .domain([0, EuMax])
        .range([0, 700])

    EuyScale = d3.scaleLinear()
        .domain([0, EuMax])
        .range([700, 0])

    JpScale = d3.scaleLinear()
        .domain([0, JpMax])
        .range([0, 700])

    JpyScale = d3.scaleLinear()
        .domain([0, JpMax])
        .range([700, 0])

    OtherScale = d3.scaleLinear()
        .domain([0, OtherMax])
        .range([0, 700])

    OtheryScale = d3.scaleLinear()
        .domain([0, OtherMax])
        .range([700, 0])

    data.forEach(function(d){                           //Making an array to store all the genre recorded in this dataset
        if(genre.includes(d.Genre)){
        }
        else{
            genre.push(d.Genre)
        }
    });

    nested_data = d3.nest()                             //nest dataset based on the year
        .key(function(d) { return d.Year;})
        .entries(data)

    for(i = 0; i< nested_data.length; i++){      
        if(isNaN(nested_data[i].key)){          //check where is the NaN
            terminate = i;
        }
        else{                                   //if not NaN, push the year data into year array
            year.push(nested_data[i].key)
            best_selling_per_year.push(nested_data[i].values[0].Genre)
        } 
    }

    for(i = 0; i < nested_data.length; i++){
        if(i != terminate){                     //To not let the NaN in the array
            let push_array = [0,0,0,0,0,0,0,0,0,0,0,0]

            nested_nested_data = d3.nest()          //nest the nested_data based on the genre
                .key(function(d) { return d.Genre;})
                .entries(nested_data[i].values)

            for( j = 0; j < nested_nested_data.length; j++){        //to put the number of games based on genre with in similar
                for(k = 0; k < genre.length; k++){                  //arrangement as in the genre array
                    if(nested_nested_data[j].key == genre[k]){
                        push_array[k] = nested_nested_data[j].values.length
                        break;
                    }
                }
        }
        data_array.push(push_array)         //push it to data_array array to store
        }
    }
    
    for (i = 0; i< year.length; i++){           //sort both year and data_array based on the year
        let temp = 0;                           //the dataset is now sorted and ready to be utilized
        for(j = i+1; j < year.length; j++){
            if(year[i] > year[j]){
                temp = best_selling_per_year[j]
                best_selling_per_year[j] = best_selling_per_year[i]
                best_selling_per_year[i]= temp
                temp = year[j]
                year[j] = year[i]
                year[i]= temp
                temp = data_array[j]
                data_array[j] = data_array[i]
                data_array[i] = temp;
            }
        }
    }
    
    for(i = 0 ; i< year.length; i++){       //find the maximum quantity of a genre sold in a year
        for(j = 0; j < data_array[i].length; j++){
            if(maximum_quantity <= data_array[i][j]){
                maximum_quantity = data_array[i][j]
            }
        }
    }
    
    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .html(d=>("Genre: "+ d.Genre +", Year:"+ d.Year));

    var yearlySalesGraph = svg.append('g')          //making the first are of graph
                        .attr('id', 'yearlySales')  //48px

    salesyScale = d3.scaleLinear()      //y scale
        .domain([0, maximum_quantity])
        .range([700, 0])

    const x = d3.scaleBand()            //x scale
        .domain(year)
        .range([20, 5090])
        .paddingInner(0.3)
        .paddingOuter(0.2)

    var salesy_axis = d3.axisLeft(salesyScale);

    var yearx_axis = d3.axisBottom(x)

    yearlySalesGraph.append('g')
        .attr("transform", "translate(25,10)")
        .call(salesy_axis);

    yearlySalesGraph.append('g')
        .attr("transform", "translate(5,710)")
        .call(yearx_axis);

    svg.append('g')
        .append("rect")
        .attr("x", 0)
        .attr("y", 1550)
        .attr("width", 2300)
        .attr("height", 800)
        .attr("fill", "#EFF5F5")

    svg.append('g')
        .append("rect")
        .attr("x", 2300)
        .attr("y", 1550)
        .attr("width", 2300)
        .attr("height", 800)
        .attr("fill", "#D6E4E5")

    svg.append('g')
        .append("rect")
        .attr("x", 2300)
        .attr("y", 750)
        .attr("width", 2300)
        .attr("height", 800)
        .attr("fill", "#EFF5F5")

    svg.append('g')
        .append("rect")
        .attr("x", 0)
        .attr("y", 750)
        .attr("width", 2300)
        .attr("height", 800)
        .attr("fill", "#D6E4E5")

    for(i = 0; i< year.length; i++){                                //Making the bars for bar chart, I decided to divide into 2 types, the best selling and normal
        for(j = 0; j <data_array[i].length; j++){                   //We will take notes of the best selling, to later use it in the interaction
            if(j == 0 && best_selling_per_year[i] == genre[j]){
                top_selling_id.push('#rect'+String(i*12+j))
                top_selling_color.push(color_arr[j])
                array_one.push([90+i*130, salesyScale(data_array[i][j])+10])
            yearlySalesGraph
                .append("rect")
                .attr('id', 'rect'+String(i*12+j))
                .attr("x", bumper + i*120 + j*10 + 25)
                .attr("y", 10 + salesyScale(data_array[i][j]))
                .attr('width', 10)
                .attr('height', 700 - salesyScale(data_array[i][j]))
                .attr('stroke', 'black')
                .attr("fill", color_arr[j])
                }
            else if(j == 0){
                array_one.push([90+i*130, salesyScale(data_array[i][j])+10])
            yearlySalesGraph
                .append("rect")
                .attr('id', 'rect'+String(i*12+j))
                .attr("x", bumper + i*120 + j*10 + 25)
                .attr("y", 10 + salesyScale(data_array[i][j]))
                .attr('width', 10)
                .attr('height', 700 - salesyScale(data_array[i][j]))
                .attr('stroke', 'black')
                .attr("fill", color_arr[j])
                }
            if(j == 1 && best_selling_per_year[i] == genre[j]){
                top_selling_id.push('#rect'+String(i*12+j))
                top_selling_color.push(color_arr[j])
                array_two.push([90+i*130, salesyScale(data_array[i][j])+10])
            yearlySalesGraph
                .append("rect")
                .attr('id', 'rect'+String(i*12+j))
                .attr("x", bumper + i*120 + j*10 + 25)
                .attr("y", 10 + salesyScale(data_array[i][j]))
                .attr('width', 10)
                .attr('height', 700 - salesyScale(data_array[i][j]))
                .attr('stroke', 'black')
                .attr("fill", color_arr[j])
                }
            else if(j == 1){
                array_two.push([90+i*130, salesyScale(data_array[i][j])+10])
            yearlySalesGraph
                .append("rect")
                .attr('id', 'rect'+String(i*12+j))
                .attr("x", bumper + i*120 + j*10 + 25)
                .attr("y", 10 + salesyScale(data_array[i][j]))
                .attr('width', 10)
                .attr('height', 700 - salesyScale(data_array[i][j]))
                .attr('stroke', 'black')
                .attr("fill", color_arr[j])
                }
            
            if(j == 2 && best_selling_per_year[i] == genre[j]){
                top_selling_id.push('#rect'+String(i*12+j))
                top_selling_color.push(color_arr[j])
                array_three.push([90+i*130, salesyScale(data_array[i][j])+10])
            yearlySalesGraph
                .append("rect")
                .attr('id', 'rect'+String(i*12+j))
                .attr("x", bumper + i*120 + j*10 + 25)
                .attr("y", 10 + salesyScale(data_array[i][j]))
                .attr('width', 10)
                .attr('height', 700 - salesyScale(data_array[i][j]))
                .attr('stroke', 'black')
                .attr("fill", color_arr[j])
                }
            else if(j == 2){
                array_three.push([90+i*130, salesyScale(data_array[i][j])+10])
            yearlySalesGraph
                .append("rect")
                .attr('id', 'rect'+String(i*12+j))
                .attr("x", bumper + i*120 + j*10 + 25)
                .attr("y", 10 + salesyScale(data_array[i][j]))
                .attr('width', 10)
                .attr('height', 700 - salesyScale(data_array[i][j]))
                .attr('stroke', 'black')
                .attr("fill", color_arr[j])
                }

            if(j == 3 && best_selling_per_year[i] == genre[j]){
                top_selling_id.push('#rect'+String(i*12+j))
                top_selling_color.push(color_arr[j])
                array_four.push([90+i*130, salesyScale(data_array[i][j])+10])
                yearlySalesGraph
                    .append("rect")
                    .attr('id', 'rect'+String(i*12+j))
                    .attr("x", bumper + i*120 + j*10 + 25)
                    .attr("y", 10 + salesyScale(data_array[i][j]))
                    .attr('width', 10)
                    .attr('height', 700 - salesyScale(data_array[i][j]))
                    .attr('stroke', 'black')
                    .attr("fill", color_arr[j])
                    }
            else if(j == 3){
                array_four.push([90+i*130, salesyScale(data_array[i][j])+10])
                yearlySalesGraph
                    .append("rect")
                    .attr('id', 'rect'+String(i*12+j))
                    .attr("x", bumper + i*120 + j*10 + 25)
                    .attr("y", 10 + salesyScale(data_array[i][j]))
                    .attr('width', 10)
                    .attr('height', 700 - salesyScale(data_array[i][j]))
                    .attr('stroke', 'black')
                    .attr("fill", color_arr[j])
                }

            if(j == 4 && best_selling_per_year[i] == genre[j]){
                top_selling_id.push('#rect'+String(i*12+j))
                top_selling_color.push(color_arr[j])
                array_five.push([90+i*130, salesyScale(data_array[i][j])+10])
                yearlySalesGraph
                    .append("rect")
                    .attr('id', 'rect'+String(i*12+j))
                    .attr("x", bumper + i*120 + j*10 + 25)
                    .attr("y", 10 + salesyScale(data_array[i][j]))
                    .attr('width', 10)
                    .attr('height', 700 - salesyScale(data_array[i][j]))
                    .attr('stroke', 'black')
                    .attr("fill", color_arr[j])
                }
            else if(j == 4){
                array_five.push([90+i*130, salesyScale(data_array[i][j])+10])
                yearlySalesGraph
                    .append("rect")
                    .attr('id', 'rect'+String(i*12+j))
                    .attr("x", bumper + i*120 + j*10 + 25)
                    .attr("y", 10 + salesyScale(data_array[i][j]))
                    .attr('width', 10)
                    .attr('height', 700 - salesyScale(data_array[i][j]))
                    .attr('stroke', 'black')
                    .attr("fill", color_arr[j])
                }

            if(j == 5 && best_selling_per_year[i] == genre[j]){
                top_selling_id.push('#rect'+String(i*12+j))
                top_selling_color.push(color_arr[j])
                array_six.push([90+i*130, salesyScale(data_array[i][j])+10])
                yearlySalesGraph
                    .append("rect")
                    .attr('id', 'rect'+String(i*12+j))
                    .attr("x", bumper + i*120 + j*10 + 25)
                    .attr("y", 10 + salesyScale(data_array[i][j]))
                    .attr('width', 10)
                    .attr('height', 700 - salesyScale(data_array[i][j]))
                    .attr('stroke', 'black')
                    .attr("fill", color_arr[j])
                }
            else if(j == 5){
                array_six.push([90+i*130, salesyScale(data_array[i][j])+10])
                yearlySalesGraph
                    .append("rect")
                    .attr('id', 'rect'+String(i*12+j))
                    .attr("x", bumper + i*120 + j*10 + 25)
                    .attr("y", 10 + salesyScale(data_array[i][j]))
                    .attr('width', 10)
                    .attr('height', 700 - salesyScale(data_array[i][j]))
                    .attr('stroke', 'black')
                    .attr("fill", color_arr[j])
                }
            
            if(j == 6 && best_selling_per_year[i] == genre[j]){
                top_selling_id.push('#rect'+String(i*12+j))
                top_selling_color.push(color_arr[j])
                array_seven.push([90+i*130, salesyScale(data_array[i][j])+10])
                yearlySalesGraph
                    .append("rect")
                    .attr('id', 'rect'+String(i*12+j))
                    .attr("x", bumper + i*120 + j*10 + 25)
                    .attr("y", 10 + salesyScale(data_array[i][j]))
                    .attr('width', 10)
                    .attr('height', 700 - salesyScale(data_array[i][j]))
                    .attr('stroke', 'black')
                    .attr("fill", color_arr[j])
                }
            else if(j == 6){
                array_seven.push([90+i*130, salesyScale(data_array[i][j])+10])
                yearlySalesGraph
                    .append("rect")
                    .attr('id', 'rect'+String(i*12+j))
                    .attr("x", bumper + i*120 + j*10 + 25)
                    .attr("y", 10 + salesyScale(data_array[i][j]))
                    .attr('width', 10)
                    .attr('height', 700 - salesyScale(data_array[i][j]))
                    .attr('stroke', 'black')
                    .attr("fill", color_arr[j])
                }
            
            if(j == 7 && best_selling_per_year[i] == genre[j]){
                top_selling_id.push('#rect'+String(i*12+j))
                top_selling_color.push(color_arr[j])
                array_eight.push([90+i*130, salesyScale(data_array[i][j])+10])
                yearlySalesGraph
                    .append("rect")
                    .attr('id', 'rect'+String(i*12+j))
                    .attr("x", bumper + i*120 + j*10 + 25)
                    .attr("y", 10 + salesyScale(data_array[i][j]))
                    .attr('width', 10)
                    .attr('height', 700 - salesyScale(data_array[i][j]))
                    .attr('stroke', 'black')
                    .attr("fill", color_arr[j])
                }
            else if(j == 7){
                array_eight.push([90+i*130, salesyScale(data_array[i][j])+10])
                yearlySalesGraph
                    .append("rect")
                    .attr('id', 'rect'+String(i*12+j))
                    .attr("x", bumper + i*120 + j*10 + 25)
                    .attr("y", 10 + salesyScale(data_array[i][j]))
                    .attr('width', 10)
                    .attr('height', 700 - salesyScale(data_array[i][j]))
                    .attr('stroke', 'black')
                    .attr("fill", color_arr[j])
                }

            if(j == 8 && best_selling_per_year[i] == genre[j]){
                top_selling_id.push('#rect'+String(i*12+j))
                top_selling_color.push(color_arr[j])
                array_nine.push([90+i*130, salesyScale(data_array[i][j])+10])
                yearlySalesGraph
                    .append("rect")
                    .attr('id', 'rect'+String(i*12+j))
                    .attr("x", bumper + i*120 + j*10 + 25)
                    .attr("y", 10 + salesyScale(data_array[i][j]))
                    .attr('width', 10)
                    .attr('height', 700 - salesyScale(data_array[i][j]))
                    .attr('stroke', 'black')
                    .attr("fill", color_arr[j])
                }
            else if(j == 8){
                array_nine.push([90+i*130, salesyScale(data_array[i][j])+10])
                yearlySalesGraph
                    .append("rect")
                    .attr('id', 'rect'+String(i*12+j))
                    .attr("x",  bumper + i*120 + j*10 + 25)
                    .attr("y", 10 + salesyScale(data_array[i][j]))
                    .attr('width', 10)
                    .attr('height', 700 - salesyScale(data_array[i][j]))
                    .attr('stroke', 'black')
                    .attr("fill", color_arr[j])
                }
            
            if(j == 9 && best_selling_per_year[i] == genre[j]){
                top_selling_id.push('#rect'+String(i*12+j))
                top_selling_color.push(color_arr[j])
                array_ten.push([90+i*130, salesyScale(data_array[i][j])+10])
                yearlySalesGraph
                    .append("rect")
                    .attr('id', 'rect'+String(i*12+j))
                    .attr("x", bumper + i*120 + j*10 + 25)
                    .attr("y", 10 + salesyScale(data_array[i][j]))
                    .attr('width', 10)
                    .attr('height', 700 - salesyScale(data_array[i][j]))
                    .attr('stroke', 'black')
                    .attr("fill", color_arr[j])
                }
            else if(j == 9){
                array_ten.push([90+i*130, salesyScale(data_array[i][j])+10])
                yearlySalesGraph
                    .append("rect")
                    .attr('id', 'rect'+String(i*12+j))
                    .attr("x", bumper + i*120 + j*10 + 25)
                    .attr("y", 10 + salesyScale(data_array[i][j]))
                    .attr('width', 10)
                    .attr('height', 700 - salesyScale(data_array[i][j]))
                    .attr('stroke', 'black')
                    .attr("fill", color_arr[j])
                }

            if(j == 10 && best_selling_per_year[i] == genre[j]){
                top_selling_id.push('#rect'+String(i*12+j))
                top_selling_color.push(color_arr[j])
                array_eleven.push([90+i*130, salesyScale(data_array[i][j])+10])
                yearlySalesGraph
                    .append("rect")
                    .attr('id', 'rect'+String(i*12+j))
                    .attr("x", bumper + i*120 + j*10 + 25)
                    .attr("y", 10 + salesyScale(data_array[i][j]))
                    .attr('width', 10)
                    .attr('height', 700 - salesyScale(data_array[i][j]))
                    .attr('stroke', 'black')
                    .attr("fill", color_arr[j])
                }
            else if(j == 10){
                array_eleven.push([90+i*130, salesyScale(data_array[i][j])+10])
                yearlySalesGraph
                    .append("rect")
                    .attr('id', 'rect'+String(i*12+j))
                    .attr("x", bumper + i*120 + j*10 + 25)
                    .attr("y", 10 + salesyScale(data_array[i][j]))
                    .attr('width', 10)
                    .attr('height', 700 - salesyScale(data_array[i][j]))
                    .attr('stroke', 'black')
                    .attr("fill", color_arr[j])
                }

            if(j == 11 && best_selling_per_year[i] == genre[j]){
                top_selling_id.push('#rect'+String(i*12+j))
                top_selling_color.push(color_arr[j])
                array_twelve.push([90+i*130, salesyScale(data_array[i][j])+10])
                yearlySalesGraph
                    .append("rect")
                    .attr('id', 'rect'+String(i*12+j))
                    .attr("x", bumper + i*120 + j*10 + 25)
                    .attr("y", 10 + salesyScale(data_array[i][j]))
                    .attr('width', 10)
                    .attr('height', 700 - salesyScale(data_array[i][j]))
                    .attr('stroke', 'black')
                    .attr("fill", color_arr[j])
                }
            else if(j == 11){
                array_twelve.push([90+i*130, salesyScale(data_array[i][j])+10])
                yearlySalesGraph
                    .append("rect")
                    .attr('id', 'rect'+String(i*12+j))
                    .attr("x", bumper + i*120 + j*10 + 25)
                    .attr("y", 10 + salesyScale(data_array[i][j]))
                    .attr('width', 10)
                    .attr('height', 700 - salesyScale(data_array[i][j]))
                    .attr('stroke', 'black')
                    .attr("fill", color_arr[j])
                }
            }
        bumper = bumper + 10;
        }
    
    yearlySalesGraph.append('g')
        .append("rect")
        .attr("x", 4938)
        .attr("y", 20)
        .attr("width", 140)
        .attr("height", 267)
        .attr("stroke", "black")
        .attr("fill", "none")

    yearlySalesGraph
        .append("circle")
        .attr("cx", 4960)
        .attr("cy", 273)
        .attr("r", 8)
        .attr("fill", 'yellow')
        .on("click", function(){
            if(top_button_num_clicked == 0){
                for(i = 0; i< top_selling_id.length; i++){
                    yearlySalesGraph.select(top_selling_id[i])
                            .transition()
                            .duration(150)
                            .attr("fill", "yellow")
                }
                top_button_num_clicked = 1;
            }
            else if(top_button_num_clicked == 1){
                for(i = 0; i< top_selling_id.length; i++){
                    yearlySalesGraph.select(top_selling_id[i])
                            .transition()
                            .duration(150)
                            .attr("fill", top_selling_color[i])
                }
                top_button_num_clicked = 0;
            }
        });
    
    yearlySalesGraph.append('g')
        .append("text")
        .text("Best Selling")
        .attr("x", 4980)
        .attr("y", 277)
        .attr("font-size", 13)
        .attr("font-family", "monospace")
        .attr("fill", "black");
    
    //NA to something graph    

    var NaEusalesGraphs = svg.append('g')
                        .attr("id", 'NaEusalesGraphs')
    
    var NaJpsalesGraphs = svg.append('g')
                        .attr("id", 'NaJpsalesGraphs')
    
    var NaOthersalesGraphs = svg.append('g')
                        .attr("id", 'NaOthersalesGraphs')

    NaEusalesGraphs.call(tip)
    NaJpsalesGraphs.call(tip)
    NaOthersalesGraphs.call(tip)

    var Nay_axis = d3.axisLeft(NayScale);
    var Eu_axis = d3.axisBottom(EuScale)
    var Jp_axis = d3.axisBottom(JpScale)
    var Other_axis = d3.axisBottom(OtherScale)
    
    NaEusalesGraphs.append('g')
        .attr("transform", "translate(25, 800)")
        .call(Nay_axis);

    NaEusalesGraphs.append('g')
        .attr("transform", "translate(25, 1500)")
        .call(Eu_axis);
    
    NaJpsalesGraphs.append('g')
        .attr("transform", "translate(800, 800)")
        .call(Nay_axis);

    NaJpsalesGraphs.append('g')
        .attr("transform", "translate(800, 1500)")
        .call(Jp_axis);

    NaOthersalesGraphs.append('g')
        .attr("transform", "translate(1575, 800)")
        .call(Nay_axis);

    NaOthersalesGraphs.append('g')
        .attr("transform", "translate(1575, 1500)")
        .call(Other_axis);

    svg.append('g')
        .append("text")
        .text("North America to ... Sales Graph")
        .attr("x", 1050)
        .attr("y", 775)
        .attr("font-size", 15)
        .attr("font-family", "monospace")
        .attr("stroke", "black")
        .attr("fill", "black");
    
    svg.append('g')
        .append("text")
        .text("EU_Sales (Mil)")
        .attr("x", 650)
        .attr("y", 1490)
        .attr("font-size", 12)
        .attr("font-family", "monospace")
        .attr("fill", "black");
    
    svg.append('g')
        .append("text")
        .text("JP_Sales (Mil)")
        .attr("x", 1420)
        .attr("y", 1490)
        .attr("font-size", 12)
        .attr("font-family", "monospace")
        .attr("fill", "black");
    
    svg.append('g')
        .append("text")
        .text("Other_Sales (Mil)")
        .attr("x", 2190)
        .attr("y", 1490)
        .attr("font-size", 12)
        .attr("font-family", "monospace")
        .attr("fill", "black");
    
    var NaEucircles = NaEusalesGraphs.append('g')
                                .selectAll('circle')
                                .data(data)
                                .enter()
                                .append("circle")
                                .attr('id', 'scatterPoint')
                                .attr("cx", function(d){return EuScale(d.EU_Sales) + 30;})
                                .attr("cy", function(d){return NayScale(d.NA_Sales) + 795})
                                .attr("r", 4)
                                .style("fill", function(d){
                                    for(i = 0; i< genre.length; i++){
                                        if(d.Genre == genre[i]){
                                            return color_arr[i]
                                        }
                                    }
                                });
    
    NaEucircles.on('mouseover', tip.show)
                .on('mouseout', tip.hide);

    var NaJpcircles = NaJpsalesGraphs.append('g')
                                .selectAll('circle')
                                .data(data)
                                .enter()
                                .append("circle")
                                .attr('id', 'scatterPoint')
                                .attr("cx", function(d){return JpScale(d.JP_Sales) + 805;})
                                .attr("cy", function(d){return NayScale(d.NA_Sales) + 795})
                                .attr("r", 4)
                                .style("fill", function(d){
                                    for(i = 0; i< genre.length; i++){
                                        if(d.Genre == genre[i]){
                                            return color_arr[i]
                                        }
                                    }
                                });
    
    NaJpcircles.on('mouseover', tip.show)
                .on('mouseout', tip.hide);

    var NaOthercircles = NaJpsalesGraphs.append('g')
                                .selectAll('circle')
                                .data(data)
                                .enter()
                                .append("circle")
                                .attr('id', 'scatterPoint')
                                .attr("cx", function(d){return OtherScale(d.Other_Sales) + 1580;})
                                .attr("cy", function(d){return NayScale(d.NA_Sales) + 795})
                                .attr("r", 4)
                                .style("fill", function(d){
                                    for(i = 0; i< genre.length; i++){
                                        if(d.Genre == genre[i]){
                                            return color_arr[i]
                                        }
                                    }
                                });

    NaOthercircles.on('mouseover', tip.show)
                    .on('mouseout', tip.hide);


//Jp to something graph

            var JpEusalesGraphs = svg.append('g')
                                .attr("id", 'JpEusalesGraphs')
            
            var JpNasalesGraphs = svg.append('g')
                                .attr("id", 'JpNasalesGraphs')
            
            var JpOthersalesGraphs = svg.append('g')
                                .attr("id", 'JpOthersalesGraphs')
                                
            JpEusalesGraphs.call(tip)
            JpNasalesGraphs.call(tip)
            JpOthersalesGraphs.call(tip)

            var Jpy_axis = d3.axisLeft(JpyScale)
            var Na_axis = d3.axisBottom(NaScale)
            
            JpEusalesGraphs.append('g')
                .attr("transform", "translate(2325, 800)")
                .call(Jpy_axis);
        
            JpEusalesGraphs.append('g')
                .attr("transform", "translate(2325, 1500)")
                .call(Eu_axis);
            
            JpNasalesGraphs.append('g')
                .attr("transform", "translate(3100, 800)")
                .call(Jpy_axis);
        
            JpNasalesGraphs.append('g')
                .attr("transform", "translate(3100, 1500)")
                .call(Na_axis);
        
            JpOthersalesGraphs.append('g')
                .attr("transform", "translate(3875, 800)")
                .call(Jpy_axis);
        
            JpOthersalesGraphs.append('g')
                .attr("transform", "translate(3875, 1500)")
                .call(Other_axis);
        
            svg.append('g')
                .append("text")
                .text("Japan to ... Sales Graph")
                .attr("x", 3350)
                .attr("y", 775)
                .attr("font-size", 15)
                .attr("font-family", "monospace")
                .attr("stroke", "black")
                .attr("fill", "black");
            
            svg.append('g')
                .append("text")
                .text("EU_Sales (Mil)")
                .attr("x", 2950)
                .attr("y", 1490)
                .attr("font-size", 12)
                .attr("font-family", "monospace")
                .attr("fill", "black");
            
            svg.append('g')
                .append("text")
                .text("NA_Sales (Mil)")
                .attr("x", 3720)
                .attr("y", 1490)
                .attr("font-size", 12)
                .attr("font-family", "monospace")
                .attr("fill", "black");
            
            svg.append('g')
                .append("text")
                .text("Other_Sales (Mil)")
                .attr("x", 4490)
                .attr("y", 1490)
                .attr("font-size", 12)
                .attr("font-family", "monospace")
                .attr("fill", "black");
            
            var JpEucircles = JpEusalesGraphs.append('g')
                                        .selectAll('circle')
                                        .data(data)
                                        .enter()
                                        .append("circle")
                                        .attr('id', 'scatterPoint')
                                        .attr("cx", function(d){return EuScale(d.EU_Sales) + 2330;})
                                        .attr("cy", function(d){return JpyScale(d.JP_Sales) + 795})
                                        .attr("r", 4)
                                        .style("fill", function(d){
                                            for(i = 0; i< genre.length; i++){
                                                if(d.Genre == genre[i]){
                                                    return color_arr[i]
                                                }
                                            }
                                        });
            
            var JpNacircles = JpNasalesGraphs.append('g')
                                        .selectAll('circle')
                                        .data(data)
                                        .enter()
                                        .append("circle")
                                        .attr('id', 'scatterPoint')
                                        .attr("cx", function(d){return NaScale(d.NA_Sales) + 3105;})
                                        .attr("cy", function(d){return JpyScale(d.JP_Sales) + 795})
                                        .attr("r", 4)
                                        .style("fill", function(d){
                                            for(i = 0; i< genre.length; i++){
                                                if(d.Genre == genre[i]){
                                                    return color_arr[i]
                                                }
                                            }
                                        });
        
            var JpOthercircles = JpOthersalesGraphs.append('g')
                                        .selectAll('circle')
                                        .data(data)
                                        .enter()
                                        .append("circle")
                                        .attr('id', 'scatterPoint')
                                        .attr("cx", function(d){return OtherScale(d.Other_Sales) + 3880;})
                                        .attr("cy", function(d){return JpyScale(d.JP_Sales) + 795})
                                        .attr("r", 4)
                                        .style("fill", function(d){
                                            for(i = 0; i< genre.length; i++){
                                                if(d.Genre == genre[i]){
                                                    return color_arr[i]
                                                }
                                            }
                                        });
            
            JpEucircles.on('mouseover', tip.show)
                        .on('mouseout', tip.hide);
            JpNacircles.on('mouseover', tip.show)
                        .on('mouseout', tip.hide);
            JpOthercircles.on('mouseover', tip.show)
                        .on('mouseout', tip.hide);
    
    //EU to something graphs

    var EuNasalesGraphs = svg.append('g')
                                .attr("id", 'EuNasalesGraphs')
            
    var EuJpsalesGraphs = svg.append('g')
                                .attr("id", 'EuJpsalesGraphs')
            
    var EuOthersalesGraphs = svg.append('g')
                                .attr("id", 'EuOthersalesGraphs')

    EuNasalesGraphs.call(tip)
    EuJpsalesGraphs.call(tip)
    EuOthersalesGraphs.call(tip)

            var Euy_axis = d3.axisLeft(EuyScale);
            
            EuNasalesGraphs.append('g')
                .attr("transform", "translate(25, 1600)")
                .call(Euy_axis);
        
            EuNasalesGraphs.append('g')
                .attr("transform", "translate(25, 2300)")
                .call(Eu_axis);
            
            EuJpsalesGraphs.append('g')
                .attr("transform", "translate(800, 1600)")
                .call(Euy_axis);
        
            EuJpsalesGraphs.append('g')
                .attr("transform", "translate(800, 2300)")
                .call(Jp_axis);
        
            EuOthersalesGraphs.append('g')
                .attr("transform", "translate(1575, 1600)")
                .call(Euy_axis);
        
            EuOthersalesGraphs.append('g')
                .attr("transform", "translate(1575, 2300)")
                .call(Other_axis);
        
            svg.append('g')
                .append("text")
                .text("Europe Union to ... Sales Graph")
                .attr("x", 1050)
                .attr("y", 1580)
                .attr("font-size", 15)
                .attr("font-family", "monospace")
                .attr("stroke", "black")
                .attr("fill", "black");
            
            svg.append('g')
                .append("text")
                .text("NA_Sales (Mil)")
                .attr("x", 650)
                .attr("y", 2290)
                .attr("font-size", 12)
                .attr("font-family", "monospace")
                .attr("fill", "black");
            
            svg.append('g')
                .append("text")
                .text("JP_Sales (Mil)")
                .attr("x", 1420)
                .attr("y", 2290)
                .attr("font-size", 12)
                .attr("font-family", "monospace")
                .attr("fill", "black");
            
            svg.append('g')
                .append("text")
                .text("Other_Sales (Mil)")
                .attr("x", 2190)
                .attr("y", 2290)
                .attr("font-size", 12)
                .attr("font-family", "monospace")
                .attr("fill", "black");
            
            var NaEucircles = EuNasalesGraphs.append('g')
                                        .selectAll('circle')
                                        .data(data)
                                        .enter()
                                        .append("circle")
                                        .attr('id', 'scatterPoint')
                                        .attr("cx", function(d){return NaScale(d.NA_Sales) + 30;})
                                        .attr("cy", function(d){return EuyScale(d.EU_Sales) + 1595})
                                        .attr("r", 4)
                                        .style("fill", function(d){
                                            for(i = 0; i< genre.length; i++){
                                                if(d.Genre == genre[i]){
                                                    return color_arr[i]
                                                }
                                            }
                                        });
            
            var NaJpcircles = EuJpsalesGraphs.append('g')
                                        .selectAll('circle')
                                        .data(data)
                                        .enter()
                                        .append("circle")
                                        .attr('id', 'scatterPoint')
                                        .attr("cx", function(d){return JpScale(d.JP_Sales) + 805;})
                                        .attr("cy", function(d){return EuyScale(d.EU_Sales)+ 1595})
                                        .attr("r", 4)
                                        .style("fill", function(d){
                                            for(i = 0; i< genre.length; i++){
                                                if(d.Genre == genre[i]){
                                                    return color_arr[i]
                                                }
                                            }
                                        });
        
            var NaOthercircles = EuOthersalesGraphs.append('g')
                                        .selectAll('circle')
                                        .data(data)
                                        .enter()
                                        .append("circle")
                                        .attr('id', 'scatterPoint')
                                        .attr("cx", function(d){return OtherScale(d.Other_Sales) + 1580;})
                                        .attr("cy", function(d){return EuyScale(d.EU_Sales) + 1595})
                                        .attr("r", 4)
                                        .style("fill", function(d){
                                            for(i = 0; i< genre.length; i++){
                                                if(d.Genre == genre[i]){
                                                    return color_arr[i]
                                                }
                                            }
                                        });
                NaEucircles.on('mouseover', tip.show)
                            .on('mouseout', tip.hide);
                NaJpcircles.on('mouseover', tip.show)
                            .on('mouseout', tip.hide);
                NaOthercircles.on('mouseover', tip.show)
                            .on('mouseout', tip.hide);
//Other to something graphs

var OtherNasalesGraphs = svg.append('g')
                        .attr("id", 'OtherNasalesGraphs')

var OtherJpsalesGraphs = svg.append('g')
                        .attr("id", 'OtherJpsalesGraphs')

var OtherEusalesGraphs = svg.append('g')
                        .attr("id", 'OtherEusalesGraphs')

var Othery_axis = d3.axisLeft(OtheryScale);

OtherNasalesGraphs.append('g')
.attr("transform", "translate(2325, 1600)")
.call(Othery_axis);

OtherNasalesGraphs.append('g')
.attr("transform", "translate(2325, 2300)")
.call(Na_axis);

OtherJpsalesGraphs.append('g')
.attr("transform", "translate(3100, 1600)")
.call(Othery_axis);

OtherJpsalesGraphs.append('g')
.attr("transform", "translate(3100, 2300)")
.call(Jp_axis);

OtherEusalesGraphs.append('g')
.attr("transform", "translate(3875, 1600)")
.call(Othery_axis);

OtherEusalesGraphs.append('g')
.attr("transform", "translate(3875, 2300)")
.call(Eu_axis);

svg.append('g')
.append("text")
.text("Other to ... Sales Graph")
.attr("x", 3350)
.attr("y", 1580)
.attr("font-size", 15)
.attr("font-family", "monospace")
.attr("stroke", "black")
.attr("fill", "black");

svg.append('g')
.append("text")
.text("NA_Sales (Mil)")
.attr("x", 2950)
.attr("y", 2290)
.attr("font-size", 12)
.attr("font-family", "monospace")
.attr("fill", "black");

svg.append('g')
.append("text")
.text("JP_Sales (Mil)")
.attr("x", 3720)
.attr("y", 2290)
.attr("font-size", 12)
.attr("font-family", "monospace")
.attr("fill", "black");

svg.append('g')
.append("text")
.text("EU_Sales (Mil)")
.attr("x", 4490)
.attr("y", 2290)
.attr("font-size", 12)
.attr("font-family", "monospace")
.attr("fill", "black");

OtherNasalesGraphs.call(tip)
OtherJpsalesGraphs.call(tip)
OtherEusalesGraphs.call(tip)

var OtherNacircles = OtherNasalesGraphs.append('g')
        .selectAll('circle')
        .data(data)
        .enter()
        .append("circle")
        .attr('id', 'scatterPoint')
        .attr("cx", function(d){return NaScale(d.NA_Sales) + 2330;})
        .attr("cy", function(d){return OtheryScale(d.Other_Sales) + 1595})
        .attr("r", 4)
        .style("fill", function(d){
            for(i = 0; i< genre.length; i++){
                if(d.Genre == genre[i]){
                    return color_arr[i]
                }
            }
        });

var OtherJpcircles = OtherJpsalesGraphs.append('g')
        .selectAll('circle')
        .data(data)
        .enter()
        .append("circle")
        .attr('id', 'scatterPoint')
        .attr("cx", function(d){return JpScale(d.JP_Sales) + 3105;})
        .attr("cy", function(d){return OtheryScale(d.Other_Sales)+ 1595})
        .attr("r", 4)
        .style("fill", function(d){
            for(i = 0; i< genre.length; i++){
                if(d.Genre == genre[i]){
                    return color_arr[i]
                }
            }
        });

var OtherEucircles = OtherEusalesGraphs.append('g')
        .selectAll('circle')
        .data(data)
        .enter()
        .append("circle")
        .attr('id', 'scatterPoint')
        .attr("cx", function(d){return EuScale(d.EU_Sales) + 3880;})
        .attr("cy", function(d){return OtheryScale(d.Other_Sales) + 1595})
        .attr("r", 4)
        .style("fill", function(d){
            for(i = 0; i< genre.length; i++){
                if(d.Genre == genre[i]){
                    return color_arr[i]
                }
            }
        });

    OtherEucircles.on('mouseover', tip.show)
        .on('mouseout', tip.hide);
    OtherNacircles.on('mouseover', tip.show)
        .on('mouseout', tip.hide);
    OtherJpcircles.on('mouseover', tip.show)
        .on('mouseout', tip.hide);

        for(i = 0; i< genre.length; i++){
            yearlySalesGraph.append('g')
                .append("text")
                .text(genre[i])
                .attr("x", 4980)
                .attr("y", 37 + 20*i)
                .attr("font-size", 13)
                .attr("font-family", "monospace")
                .attr("fill", "black");
            
            yearlySalesGraph.append('g')
                .append("circle")
                .attr('id', 'circ'+i)
                .attr("cx", 4960)
                .attr("cy", 33 + 20*i)
                .attr("r", 8)
                .attr("fill", color_arr[i])
                .on("click", function(){
                    if(this.id == "circ0"){
                        if(clicked_one == 0){
                            var line = d3.line()
                                    .x(function(d) { return d[0]; }) 
                                    .y(function(d) { return d[1]; }) 
                                    .curve(d3.curveMonotoneX)
                                                    
                                    yearlySalesGraph.append("path")
                                                    .datum(array_one)
                                                    .attr("id", "lines1")
                                                    .attr("class", "line") 
                                                    .attr("d", line)
                                                    .style("fill", "none")
                                                    .style("stroke", color_arr[0])
                                                    .style("stroke-width", "2");
                            
                            var point = yearlySalesGraph.append('g')
                                                    .selectAll("dot")
                                                    .data(array_one)
                                                    .enter()
                                                    .append("circle")
                                                    .attr("id", "dots1")
                                                    .attr("cx", function (d) { return d[0]; } )
                                                    .attr("cy", function (d) { return d[1]; } )
                                                    .attr("r", 5)
                                                    .style("fill", color_arr[0]);

                            OtherNacircles.exit().remove();

                            clicked_one = 1;
                        }
                        else if(clicked_one == 1){
                            yearlySalesGraph.selectAll("#lines1").style("opacity", 0)
                            yearlySalesGraph.selectAll("#dots1").style("opacity", 0)
                            clicked_one = 0;
                        }
                    }
                    else if(this.id == "circ1"){
                        if(clicked_two == 0){
                            var point = yearlySalesGraph.append('g')
                                                    .selectAll("dot")
                                                    .data(array_two)
                                                    .enter()
                                                    .append("circle")
                                                    .attr("id", "dots2")
                                                    .attr("cx", function (d) { return d[0]; } )
                                                    .attr("cy", function (d) { return d[1]; } )
                                                    .attr("r", 5)
                                                    .style("fill", color_arr[1]);
                        
                            var line = d3.line()
                                    .x(function(d) { return d[0]; }) 
                                    .y(function(d) { return d[1]; }) 
                                    .curve(d3.curveMonotoneX)
                                                    
                                    yearlySalesGraph.append("path")
                                                    .datum(array_two)
                                                    .attr("id", "lines2")
                                                    .attr("class", "line") 
                                                    .attr("d", line)
                                                    .style("fill", "none")
                                                    .style("stroke", color_arr[1])
                                                    .style("stroke-width", "2");
                            clicked_two = 1;
                        }
                        else if(clicked_two == 1){
                            yearlySalesGraph.selectAll("#lines2").style("opacity", 0)
                            yearlySalesGraph.selectAll("#dots2").style("opacity", 0)
                            clicked_two = 0;
                        }
                    }
                    else if(this.id == "circ2"){
                        if(clicked_three == 0){
                            var point = yearlySalesGraph.append('g')
                                                    .selectAll("dot")
                                                    .data(array_three)
                                                    .enter()
                                                    .append("circle")
                                                    .attr("id", "dots3")
                                                    .attr("cx", function (d) { return d[0]; } )
                                                    .attr("cy", function (d) { return d[1]; } )
                                                    .attr("r", 5)
                                                    .style("fill", color_arr[2]);
                        
                            var line = d3.line()
                                    .x(function(d) { return d[0]; }) 
                                    .y(function(d) { return d[1]; }) 
                                    .curve(d3.curveMonotoneX)
                                                    
                                    yearlySalesGraph.append("path")
                                                    .datum(array_three)
                                                    .attr("id", "lines3")
                                                    .attr("class", "line") 
                                                    .attr("d", line)
                                                    .style("fill", "none")
                                                    .style("stroke", color_arr[2])
                                                    .style("stroke-width", "2");
                            clicked_three = 1;
                        }
                        else if(clicked_three == 1){
                            yearlySalesGraph.selectAll("#lines3").style("opacity", 0)
                            yearlySalesGraph.selectAll("#dots3").style("opacity", 0)
                            clicked_three = 0;
                        }
                    }
                    else if(this.id == "circ3"){
                        if(clicked_four == 0){
                            var point = yearlySalesGraph.append('g')
                                                    .selectAll("dot")
                                                    .data(array_four)
                                                    .enter()
                                                    .append("circle")
                                                    .attr("id", "dots4")
                                                    .attr("cx", function (d) { return d[0]; } )
                                                    .attr("cy", function (d) { return d[1]; } )
                                                    .attr("r", 5)
                                                    .style("fill", color_arr[3]);
                        
                            var line = d3.line()
                                    .x(function(d) { return d[0]; }) 
                                    .y(function(d) { return d[1]; }) 
                                    .curve(d3.curveMonotoneX)
                                                    
                                    yearlySalesGraph.append("path")
                                                    .datum(array_four)
                                                    .attr("id", "lines4")
                                                    .attr("class", "line") 
                                                    .attr("d", line)
                                                    .style("fill", "none")
                                                    .style("stroke", color_arr[3])
                                                    .style("stroke-width", "2");
                            clicked_four = 1;
                        }
                        else if(clicked_four == 1){
                            yearlySalesGraph.selectAll("#lines4").style("opacity", 0)
                            yearlySalesGraph.selectAll("#dots4").style("opacity", 0)
                            clicked_four = 0;
                        }
                    }
                    else if(this.id == "circ4"){
                        if(clicked_five == 0){
                            var point = yearlySalesGraph.append('g')
                                                    .selectAll("dot")
                                                    .data(array_five)
                                                    .enter()
                                                    .append("circle")
                                                    .attr("id", "dots5")
                                                    .attr("cx", function (d) { return d[0]; } )
                                                    .attr("cy", function (d) { return d[1]; } )
                                                    .attr("r", 5)
                                                    .style("fill", color_arr[4]);
                        
                            var line = d3.line()
                                    .x(function(d) { return d[0]; }) 
                                    .y(function(d) { return d[1]; }) 
                                    .curve(d3.curveMonotoneX)
                                                    
                                    yearlySalesGraph.append("path")
                                                    .datum(array_five)
                                                    .attr("id", "lines5")
                                                    .attr("class", "line") 
                                                    .attr("d", line)
                                                    .style("fill", "none")
                                                    .style("stroke", color_arr[4])
                                                    .style("stroke-width", "2");
                            clicked_five = 1;
                        }
                        else if(clicked_five == 1){
                            yearlySalesGraph.selectAll("#lines5").style("opacity", 0)
                            yearlySalesGraph.selectAll("#dots5").style("opacity", 0)
                            clicked_five = 0;
                        }
                    }
                    else if(this.id == "circ5"){
                        if(clicked_six == 0){
                            var point = yearlySalesGraph.append('g')
                                                    .selectAll("dot")
                                                    .data(array_six)
                                                    .enter()
                                                    .append("circle")
                                                    .attr("id", "dots6")
                                                    .attr("cx", function (d) { return d[0]; } )
                                                    .attr("cy", function (d) { return d[1]; } )
                                                    .attr("r", 5)
                                                    .style("fill", color_arr[5]);
                        
                            var line = d3.line()
                                    .x(function(d) { return d[0]; }) 
                                    .y(function(d) { return d[1]; }) 
                                    .curve(d3.curveMonotoneX)
                                                    
                                    yearlySalesGraph.append("path")
                                                    .datum(array_six)
                                                    .attr("id", "lines6")
                                                    .attr("class", "line") 
                                                    .attr("d", line)
                                                    .style("fill", "none")
                                                    .style("stroke", color_arr[5])
                                                    .style("stroke-width", "2");
                            clicked_six = 1;
                        }
                        else if(clicked_six == 1){
                            yearlySalesGraph.selectAll("#lines6").style("opacity", 0)
                            yearlySalesGraph.selectAll("#dots6").style("opacity", 0)
                            clicked_six = 0;
                        }
                    }
                    else if(this.id == "circ6"){
                        if(clicked_seven == 0){
                            var point = yearlySalesGraph.append('g')
                                                    .selectAll("dot")
                                                    .data(array_seven)
                                                    .enter()
                                                    .append("circle")
                                                    .attr("id", "dots7")
                                                    .attr("cx", function (d) { return d[0]; } )
                                                    .attr("cy", function (d) { return d[1]; } )
                                                    .attr("r", 5)
                                                    .style("fill", color_arr[6]);
                        
                            var line = d3.line()
                                    .x(function(d) { return d[0]; }) 
                                    .y(function(d) { return d[1]; }) 
                                    .curve(d3.curveMonotoneX)
                                                    
                                    yearlySalesGraph.append("path")
                                                    .datum(array_seven)
                                                    .attr("id", "lines7")
                                                    .attr("class", "line") 
                                                    .attr("d", line)
                                                    .style("fill", "none")
                                                    .style("stroke", color_arr[6])
                                                    .style("stroke-width", "2");
                            clicked_seven = 1;
                        }
                        else if(clicked_seven == 1){
                            yearlySalesGraph.selectAll("#lines7").style("opacity", 0)
                            yearlySalesGraph.selectAll("#dots7").style("opacity", 0)
                            clicked_seven = 0;
                        }
                    }
                    else if(this.id == "circ7"){
                        if(clicked_eight == 0){
                            var point = yearlySalesGraph.append('g')
                                                    .selectAll("dot")
                                                    .data(array_eight)
                                                    .enter()
                                                    .append("circle")
                                                    .attr("id", "dots8")
                                                    .attr("cx", function (d) { return d[0]; } )
                                                    .attr("cy", function (d) { return d[1]; } )
                                                    .attr("r", 5)
                                                    .style("fill", color_arr[7]);
                        
                            var line = d3.line()
                                    .x(function(d) { return d[0]; }) 
                                    .y(function(d) { return d[1]; }) 
                                    .curve(d3.curveMonotoneX)
                                                    
                                    yearlySalesGraph.append("path")
                                                    .datum(array_eight)
                                                    .attr("id", "lines8")
                                                    .attr("class", "line") 
                                                    .attr("d", line)
                                                    .style("fill", "none")
                                                    .style("stroke", color_arr[7])
                                                    .style("stroke-width", "2");
                            clicked_eight = 1;
                        }
                        else if(clicked_eight == 1){
                            yearlySalesGraph.selectAll("#lines8").style("opacity", 0)
                            yearlySalesGraph.selectAll("#dots8").style("opacity", 0)
                            clicked_eight = 0;
                        }
                    }
                    else if(this.id == "circ8"){
                        if(clicked_nine == 0){
                            var point = yearlySalesGraph.append('g')
                                                    .selectAll("dot")
                                                    .data(array_nine)
                                                    .enter()
                                                    .append("circle")
                                                    .attr("id", "dots9")
                                                    .attr("cx", function (d) { return d[0]; } )
                                                    .attr("cy", function (d) { return d[1]; } )
                                                    .attr("r", 5)
                                                    .style("fill", color_arr[8]);
                        
                            var line = d3.line()
                                    .x(function(d) { return d[0]; }) 
                                    .y(function(d) { return d[1]; }) 
                                    .curve(d3.curveMonotoneX)
                                                    
                                    yearlySalesGraph.append("path")
                                                    .datum(array_nine)
                                                    .attr("id", "lines9")
                                                    .attr("class", "line") 
                                                    .attr("d", line)
                                                    .style("fill", "none")
                                                    .style("stroke", color_arr[8])
                                                    .style("stroke-width", "2");
                            clicked_nine = 1;
                        }
                        else if(clicked_nine == 1){
                            yearlySalesGraph.selectAll("#lines9").style("opacity", 0)
                            yearlySalesGraph.selectAll("#dots9").style("opacity", 0)
                            clicked_nine = 0;
                        }
                    }
                    else if(this.id == "circ9"){
                        if(clicked_ten == 0){
                            var point = yearlySalesGraph.append('g')
                                                    .selectAll("dot")
                                                    .data(array_ten)
                                                    .enter()
                                                    .append("circle")
                                                    .attr("id", "dots10")
                                                    .attr("cx", function (d) { return d[0]; } )
                                                    .attr("cy", function (d) { return d[1]; } )
                                                    .attr("r", 5)
                                                    .style("fill", color_arr[9]);
                        
                            var line = d3.line()
                                    .x(function(d) { return d[0]; }) 
                                    .y(function(d) { return d[1]; }) 
                                    .curve(d3.curveMonotoneX)
                                                    
                                    yearlySalesGraph.append("path")
                                                    .datum(array_ten)
                                                    .attr("id", "lines10")
                                                    .attr("class", "line") 
                                                    .attr("d", line)
                                                    .style("fill", "none")
                                                    .style("stroke", color_arr[9])
                                                    .style("stroke-width", "2");
                            clicked_ten = 1;
                        }
                        else if(clicked_ten == 1){
                            yearlySalesGraph.selectAll("#lines10").style("opacity", 0)
                            yearlySalesGraph.selectAll("#dots10").style("opacity", 0)
                            clicked_ten = 0;
                        }
                    }
                    else if(this.id == "circ10"){
                        if(clicked_eleven == 0){
                            var point = yearlySalesGraph.append('g')
                                                    .selectAll("dot")
                                                    .data(array_eleven)
                                                    .enter()
                                                    .append("circle")
                                                    .attr("id", "dots11")
                                                    .attr("cx", function (d) { return d[0]; } )
                                                    .attr("cy", function (d) { return d[1]; } )
                                                    .attr("r", 5)
                                                    .style("fill", color_arr[10]);
                        
                            var line = d3.line()
                                    .x(function(d) { return d[0]; }) 
                                    .y(function(d) { return d[1]; }) 
                                    .curve(d3.curveMonotoneX)
                                                    
                                    yearlySalesGraph.append("path")
                                                    .datum(array_eleven)
                                                    .attr("id", "lines11")
                                                    .attr("class", "line") 
                                                    .attr("d", line)
                                                    .style("fill", "none")
                                                    .style("stroke", color_arr[10])
                                                    .style("stroke-width", "2");
                            clicked_eleven = 1;
                        }
                        else if(clicked_eleven == 1){
                            yearlySalesGraph.selectAll("#lines11").style("opacity", 0)
                            yearlySalesGraph.selectAll("#dots11").style("opacity", 0)
                            clicked_eleven = 0;
                        }
                    }
                    else if(this.id == "circ11"){
                        if(clicked_twelve == 0){
                            var point = yearlySalesGraph.append('g')
                                                    .selectAll("dot")
                                                    .data(array_twelve)
                                                    .enter()
                                                    .append("circle")
                                                    .attr("id", "dots12")
                                                    .attr("cx", function (d) { return d[0]; } )
                                                    .attr("cy", function (d) { return d[1]; } )
                                                    .attr("r", 5)
                                                    .style("fill", color_arr[11]);
                        
                            var line = d3.line()
                                    .x(function(d) { return d[0]; }) 
                                    .y(function(d) { return d[1]; }) 
                                    .curve(d3.curveMonotoneX)
                                                    
                                    yearlySalesGraph.append("path")
                                                    .datum(array_twelve)
                                                    .attr("id", "lines12")
                                                    .attr("class", "line") 
                                                    .attr("d", line)
                                                    .style("fill", "none")
                                                    .style("stroke", color_arr[11])
                                                    .style("stroke-width", "2");
                            clicked_twelve = 1;
                        }
                        else if(clicked_twelve == 1){
                            yearlySalesGraph.selectAll("#lines12").style("opacity", 0)
                            yearlySalesGraph.selectAll("#dots12").style("opacity", 0)
                            clicked_twelve = 0;
                        }
                    }
                });
        }
});
