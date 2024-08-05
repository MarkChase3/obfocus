/*update = (x) => {
    let ssss = Android.read(x)
    console.log(ssss + 'heheh')
    return ssss;
}
fetch = (str) => {
    console.log(JSON.stringify(Android))
    console.log(Android.fetch(str))
    return {text: () => Android.fetch(str)}
}*/
let running = false;
let s = 0;
let localStorage = {}
//localStorage.hard = update("hard")
//localStorage.solved = update("solved")
console.log(localStorage.hard + 'haha');
if(!localStorage.hard.length)localStorage.hard = '[]'
if(!localStorage.solved.length)localStorage.solved = '[]'
Array.from(document.querySelectorAll('.missions li')).forEach((e,i,arr)=>{
	let solved = JSON.parse(localStorage.solved).filter(g=>g[0]==i).length
	let hard = JSON.parse(localStorage.hard).filter(g=>g[0]==i).length
	e.children[1].innerHTML = solved+' solucionadas e '+hard+' marcadas	'
	e.onclick = () => {
		if(!running){
			arr[s].classList.remove('selected')
			s = i
			arr[s].classList.add('selected')
		}
	}
})
let h;
document.querySelector('.timer').onclick = () => {
	running = true
	document.querySelector('.missions').style = "display: none;"
	raw = fetch('exams/'+document.querySelectorAll('.missions li')[s].firstElementChild.innerHTML.split(' ').join('-').toLowerCase()+'.exam').text()
		let doc = raw.split('{NOVA QUESTAO}').slice(1).map(e=>{
			let r = {};
			r.source = e.split(/\[[A-Z]+\]/)[1]
			r.question = e.split(/\[[A-Z]+\]/)[2]
			r.solution = e.split(/\[[A-Z]+\]/)[3]
			r.credit = e.split(/\[[A-Z]+\]/)[4]
			r.address = e.split(/\[[A-Z]+\]/)[5]
			if(r.credit)r.credit = r.credit.split('\n').join('')
			if(r.address)r.address = r.address.split('\n').join('')
			return r;
		})
		console.log(document.querySelector('.exam').firstElementChild)
		for(let k = 0; k < doc.length-1; k++)document.querySelector('.exam').appendChild(document.querySelector('.exam').firstElementChild.cloneNode(true));
		Array.from(document.querySelectorAll('.question')).forEach((e,i)=>{
			e.innerHTML = doc[i].question.split('\n').join('<br>').split('!(').map((e,i)=>i>0?e.slice(0, e.indexOf(')'))+'">'+e.slice(e.indexOf(')')+1):e).join('<img src="assets/')
		})
		Array.from(document.querySelectorAll('.source')).forEach((e,i)=>{
			e.innerHTML = doc[i].source;
		})
		Array.from(document.querySelectorAll('.solution')).forEach((e,i)=>{
			e.innerHTML = doc[i].solution + 'Também disponível em <a href="'+doc.address+'">'+doc[i].credit+'</a>';
		})
		document.querySelectorAll('.hard-check').forEach((e,i)=>{
			e.onchange = () => {
				if(e.checked && JSON.parse(localStorage.hard).filter(e=>e[0]==s&&e[1]==i).length==0)localStorage.hard = JSON.stringify([...JSON.parse(localStorage.hard), [s, i]])
				if(!e.checked && JSON.parse(localStorage.hard).filter(e=>e[0]==s&&e[1]==i).length!=0)localStorage.hard = JSON.stringify([...JSON.parse(localStorage.hard).filter(e=>e[0]!=s&&e[1]!=i)])
			}
		})
		document.querySelectorAll('.solved-check').forEach((e,i)=>{
			e.onchange = () => {
				if(e.checked && JSON.parse(localStorage.solved).filter(e=>e[0]==s&&e[1]==i).length==0)localStorage.solved = JSON.stringify([...JSON.parse(localStorage.solved), [s, i]])
				if(!e.checked && JSON.parse(localStorage.solved).filter(e=>e[0]==s&&e[1]==i).length!=0)localStorage.solved = JSON.stringify([...JSON.parse(localStorage.solved).filter(e=>e[0]!=s&&e[1]!=i)])
			}
		})
		document.querySelectorAll('.show-solution-check').forEach((e,i)=>{
			e.onchange = () => {
				let el = Array.from(document.querySelectorAll('.solution'))[i]
				el.hidden = !el.hidden;
			}
		})
		JSON.parse(localStorage.hard).forEach(e=>{
			if(e[0] == s){
				document.querySelectorAll('.hard-check')[e[1]].click()
			}
		})
		JSON.parse(localStorage.solved).forEach(e=>{
			if(e[0] == s){
				document.querySelectorAll('.solved-check')[e[1]].click()
			}
		})
	Array.from(document.querySelectorAll('.exam')).forEach(e=>{e.style = "display: visible;"})
	h = window.setInterval(() => {
		let t = document.querySelector('.timer').innerHTML;
		if(t == '00:00'){
			running = false;
			document.querySelector('.missions li')[s].innerHTML += '<span'
			window.clearInterval(h)
		} else {
			document.querySelector('.timer').innerHTML = (t.split(':')[1] == '00' ? (''+(+t.split(':')[0]-1)).padStart(2, '0') + ':59' : t.split(':')[0]+':'+(''+(+t.split(':')[1]-1)).padStart(2, '0'));
		}
	}, 1000)
}
document.querySelector('.to-main-menu').onclick = () => {
	running = false;
	document.querySelector('.missions').style = 'display: visible;'	
	document.querySelector('.exam').innerHTML = document.querySelector('.exam').firstElementChild.outerHTML;
	Array.from(document.querySelectorAll('.exam')).forEach(e=>{e.style = "display: none;"})
	document.querySelector('.timer').innerHTML = '25:00'
	window.clearInterval(h)
}

/*window.setInterval(() => {
    Android.send("hard", localStorage.hard);
}, 100)*/