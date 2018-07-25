function time(){
    return Promise.resolve().then(function(){
        count = 0
        setInterval(function(){
            console.log(count)
            count++
        }, 1000)
    })
}

function mark(rob){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(rob.getMousePos())
        }, 3000);
    }).then(function(coords){
        return {'rob': rob, 'x': coords.x, 'y': coords.y, "coords": coords}
    })
}

function track(rob, coords){
    coords = coords ? coords : {'x' : 0, 'y': 0} 
    setInterval(function(){
        current = rob.getMousePos()
        console.log("x: "+(current.x-coords.x)+" y: "+(current.y-coords.y))
    }, 1000)
}

function delay(t, v) {
    return new Promise(function(resolve) { 
        setTimeout(resolve.bind(null, v), t)
    });
 }
 
Promise.prototype.delay = function(t) {
     return this.then(function(v) {
         return delay(t, v);
     });
 }

 function click(rob){
     return Promise.resolve().then(function(){
         return rob.mouseClick()
     })
 }

 function move(rob, coords, x,y){
     return Promise.resolve().then(function(){
         return rob.moveMouseSmooth((coords.x + x),(coords.y + y))
     })
 }

 function moveClick(rob, coords, x, y){
     return Promise.resolve().then(function(){
         return move(rob, coords, x, y)
     }).then(function(){
         return click(rob)
     })
 }

 function drag(rob, coords, x1,y1,x2,y2){
     return Promise.resolve().then(function(){
        rob.moveMouseSmooth((coords.x + x1),(coords.y + y1))
    }).then(function(){
        rob.mouseToggle('down')
    }).then(function(){
        rob.dragMouse((coords.x + x2),(coords.y + y2))
    }).delay(500).then(function(){
        rob.mouseToggle('up')
    }).delay(500)
 }

 function selectMtMoon2(data){
    return Promise.resolve().then(function(){
        return move(data.rob, {'x': data.x, 'y':data.y}, 262, 259)
    }).then(function(){
        return click(data.rob, {'x': data.x, 'y':data.y},)
    })
 }

 function selectRoute5(data){
    return Promise.resolve().then(function(){
        return move(data.rob, {'x': data.x, 'y':data.y}, 329, 189)
    }).then(function(){
        return click(data.rob, {'x': data.x, 'y':data.y},)
    })
 }

 function pressSkip(data){
    return Promise.resolve().then(function(){
        return move(data.rob, {'x': data.x, 'y':data.y}, 51, 29)
    }).then(function(){
        return click(data.rob, {'x': data.x, 'y':data.y},)
    })
 }

 function pressStart(data){
    return Promise.resolve().then(function(){
        return move(data.rob, {'x': data.x, 'y':data.y}, 728, 37)
    }).then(function(){
        return click(data.rob, {'x': data.x, 'y':data.y},)
    })
 }

 function closeLevel(data){
    return Promise.resolve().then(function(){
        return move(data.rob, {'x': data.x, 'y':data.y}, 556, 277)
    }).then(function(){
        return click(data.rob, {'x': data.x, 'y':data.y},)
    })
 }

 function placeFirstMtMoon2(data){
    return Promise.resolve().then(function(){
        return place(data, 1, 266, 226)
    })
 }

 function placeSecondMtMoon2(data){
     return Promise.resolve().then(function(){
         return place(data, 3, 556, 228)
     })
 }

 function placeFirstRoute5(data){
    return Promise.resolve().then(function(){
        return place(data, 1, 483, 234)
    })
 }

 function placeSecondRoute5(data){
    return Promise.resolve().then(function(){
        return place(data, 2, 481, 304)
    })
 }

 function placeThirdRoute5(data){
    return Promise.resolve().then(function(){
        return place(data, 3, 483, 386)
    })
 }

function place(data, no, x, y){
    return Promise.resolve().then(function(){
        return drag(data.rob, {'x': data.x, 'y':data.y}, 20+(100*no), 369, x, y)
    })
}

 function setSpeed(data, sp){
     return Promise.resolve().then(function(){
         if(sp === 4){
             return move(data.rob, {'x': data.x, 'y':data.y}, 260, 451 )
         }
     }).then(function(){
        return click(data.rob)
     })
 }

 function levelFirst3(data){
    return Promise.resolve().then(function(){
        return levelUp(data, 1)
    }).then(function(){
       return levelUp(data, 2)
   }).then(function(){
       return levelUp(data, 3)
   })
 }

 function levelAllUp(data){
     return Promise.resolve().then(function(){
        return levelFirst3(data)
    }).then(function(){
        return levelUp(data, 4)
    }).then(function(){
        return levelUp(data, 5)
    }).then(function(){
        return levelUp(data, 6)
    })
 }
 
 function levelUp(data, no){
     return Promise.resolve().then(function(){
        return moveClick(data.rob, data.coords, 20+(100*no), 369)
     }).then(function(){
         return moveClick(data.rob, data.coords, 691, 271)
     }).delay(1000).then(function(){
         return moveClick(data.rob,data.coords, 459, 286)
     })
 }

 function mtMoon2(data){
    return Promise.resolve().then(function(){
        return selectMtMoon2(data)
    }).then(function(){
        return pressStart(data)
    }).then(function(){
        return pressSkip(data)
    }).delay(2000).then(function(){
        return placeFirstMtMoon2(data)
    }).then(function(){
        return placeSecondMtMoon2(data)
    }).then(function(){
        return setSpeed(data, 4)
    }).delay(85800).then(function(){
        return closeLevel(data)
    }).delay(500).then(function(){
        return data
    })
 }

 function route5(data){
    return Promise.resolve().then(function(){
        return selectRoute5(data)
    }).then(function(){
        return pressStart(data)
    }).then(function(){
        return pressSkip(data)
    }).delay(2000).then(function(){
        return placeFirstRoute5(data)
    }).then(function(){
        return placeSecondRoute5(data)
    }).then(function(){
        return placeThirdRoute5(data)
    }).then(function(){
        return setSpeed(data, 4)
    }).then(function(){
        return levelFirst3(data)
    }).delay(50000).then(function(){
        return levelFirst3(data)
    }).delay(50000).then(function(){
        return levelFirst3(data)
    }).delay(34800).then(function(){
        return console.log("5 seconds")
    }).delay(5000).then(function(){
        return closeLevel(data)
    }).delay(500).then(function(){
        return data
    })
 }

function go(data){
    return Promise.resolve().then(function(){
        return route5(data)
    }).then(function(){
        return go(data)
    })

}

function main(){
    Promise.resolve().then(function (){
        return require('robotjs')
    }).then(function(rob){
        return mark(rob)
    }).then(function(data){
        return go(data)

    })
}

main()

//return track(data.rob, {'x':data.x, 'y':data.y})

/*
Route3 Button
x: 250 y: 156
Mt. Moon 2 Button
x: 262 y:259
Start Button
x: 728 y: 37
Skip Button 
x: 51 y: 29
Level Up Button
691, 271
Don't Learn Button
459, 286

Route 5 Butt
329, 189
Route 5 spot 1
483, 234
483, 304
483, 386
after lvl up 4,5
483, 274
483, 352


*/