const url = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";
let gameData;
let w = window.innerWidth * 0.8;
let h = window.innerHeight * 0.8;
let padding = 20;
let svg = d3.select('svg');
let tooltip = d3.select('#tooltip');
let legend = d3.select('#legend')

let getData = () =>{
    fetch(url)
        .then(response => response.json())
        .then(data => {
            gameData = data;
            setCanvas();
        })
}

let setCanvas = () => {
    svg.attr('width', w)
        .attr('height', h);

    legend.attr('width', 300)
        .attr('height', 120)


    let hierarchy = d3.hierarchy(gameData, (node) => {
        return node.children;
    })
    .sum(node => {
        return node.value;
    })
    .sort((node1, node2) => {
        return node2.value - node1.value;
    })

    let treeMap = d3.treemap()
        .size([w, h]);

    treeMap(hierarchy);
    let topGames = hierarchy.leaves();

    console.log(topGames)

    let displayData = svg.selectAll('g')
        .data(topGames)
        .enter()
        .append('g')
        .attr('transform', x=> {
            return 'translate(' + x.x0 + ', ' + x.y0 + ')';
        })
    
    displayData.append('rect')
        .attr('class', 'tile')
        .attr('fill', (x) => {
            switch(x.data.category){
                case 'Wii':
                    return '#9A86A4';
                    break;
                case 'GB':
                    return '#B1BCE6';
                    break;
                case 'PS2':
                    return '#B7E5DD';
                    break;
                case 'SNES':
                    return '#F1F0C0';
                    break;
                case 'GBA':
                    return '#5F7161';
                    break;
                case '2600':
                    return '#6D8B74';
                    break;
                case 'DS':
                    return '#97C4B8';
                    break;
                case 'PS3':
                    return '#8CC0DE';
                    break;
                case '3DS':
                    return '#354259';
                    break;
                case 'PS':
                    return '#FF8AAE';
                    break;
                case 'XB':
                    return '#BB6464';
                    break;
                case 'PSP':
                    return '#A97155';
                    break;
                case 'X360':
                    return '#6867AC';
                    break;
                case 'NES':
                    return '#A267AC';
                    break;
                case 'PS4':
                    return '#632626';
                    break;
                case 'N64':
                    return '#7897AB';
                    break;
                case 'PC':
                    return '#54BAB9';
                    break;
                case 'XOne':
                    return '#886F6F';
                    break;    
                default:
                    return 'red';
            }
        })
        .attr('data-name', x =>{
            return x.data.name;
        })
        .attr('data-category', x => {
            return x.data.category;
        })
        .attr('data-value', x => {
            return x.data.value;
        })
        .attr('width', x => {
            return x.x1 - x.x0;
        })
        .attr('height', x => {
            return x.y1 - x.y0;
        })
        .on('mouseover', game => {
            tooltip.transition()
                .style('visibility', 'visible');
            let sum = game.data.value.toString();
            let name = game.data.name;
            let xMouse = d3.event.x;
            let yMouse = d3.event.y;
            tooltip.style('top', yMouse - 10 + 'px');
            tooltip.style('left', xMouse + 'px');

            tooltip.html(
                name + ': Revenue = $' + sum + " Million USD"
            );
            tooltip.attr('data-value', sum)
        })
        .on('mouseout', x => {
            tooltip.transition()
                .style('visibility', 'hidden')
        })
    
}

getData();