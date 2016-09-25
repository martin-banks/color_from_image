
let state = {
	image: ()=> document.getElementById('testImage'),
	channels: [ 
		'red',
		'green',
		'blue'
	],
	appContainer: ()=> document.getElementById('appContainer'),
	colorContainer: ()=> document.getElementById('colorContainer'),
	paletteContainer: ()=> document.getElementById('paletteContainer'),
	averageContainer: ()=> document.getElementById('averageContainer')
}



let colorTemplate = (color)=>{
	return `
		<section>
			<div class="preview" style="background-color: rgb(${color[0]},${color[1]},${color[2]})"></div>
			${color.map((value, index)=>{
				return `
					<h2 id="color">${state.channels[index]}: ${value}</h2>
				`	
			}).join('')}
		</section>
	` 		
}

let paletteTemplate = (palette)=>{
	return `
		<h1>Palette values</h1>
		${palette.map(colors=>{
			return `
				${colorTemplate(colors)}
			`
		}).join('')}
	`
}

let average = (array, subIndex)=>{
	return Math.floor(array.reduce((count, item)=>{ 
		return count + item[subIndex] 
	}, 0 ) / array.length)
}

let averageColorValue = (palette)=>{
	return [
		average(palette, 0), average(palette, 1), average(palette, 2)
	]
}



	let random = (Math.floor(Math.random()*11)) + 0

	state.appContainer().innerHTML = `
		<img id="testImage" src="images/${random}.jpg" alt="" />
		<div id="colorContainer" class="container"></div>
		<div id="averageContainer" class="container"></div>
		<div id="paletteContainer" class="container"></div>
	`

	setTimeout(function() {
		let colorThief = new ColorThief();
		let color = colorThief.getColor(state.image());
		let palette = colorThief.getPalette(state.image());

		console.log(color)
		console.log(palette)
		console.log(averageColorValue(palette))

		state.colorContainer().innerHTML = `<h1>Selected color</h1>${colorTemplate(color,1)}	`
		state.averageContainer().innerHTML = `<h1>Average values</h1>${colorTemplate(averageColorValue(palette))}`
		state.paletteContainer().innerHTML = paletteTemplate(palette, 3)

		document.querySelector('body').style.backgroundColor = `rgb(${color[0]},${color[1]},${color[2]})`

	}, 1000);







