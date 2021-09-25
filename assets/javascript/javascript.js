let numberArray = [];
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d"); 
canvas.width =  document.documentElement.clientWidth * 90 /100;
canvas.height = document.documentElement.clientHeight * 45 / 100;
ctx.translate(0, canvas.height);
ctx.scale(1, -1);

function SetResetArray(){
    numberArray = [];
    for(let i = 0;i < document.getElementById('ArrayLength').value;i++)
        numberArray.push(Math.floor(Math.random(0,100) * 400));
    Draw();
}

function Draw(){
    let current_x = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    let width = canvas.width / numberArray.length / 2;
    ctx.moveTo(0,0);
    ctx.lineTo(canvas.width,0);
    ctx.moveTo(0,0);
    numberArray.forEach(function(i){
        current_x += width;
        ctx.moveTo(current_x,0);
        ctx.lineTo(current_x,i);
        current_x += width;
        ctx.lineTo(current_x,i);
        ctx.lineTo(current_x,0);
    });
    ctx.lineTo(current_x,0);
    ctx.stroke();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

async function BubbleSort()
{
    for (let i = 0; i < numberArray.length-1; i++)
    {
            for (let j = 0; j < numberArray.length-i-1; j++)
            {  
                if (numberArray[j] > numberArray[j+1])
                {
                    temp = numberArray[j+1];
                    numberArray[j+1] = numberArray[j];
                    numberArray[j] = temp;
                    Draw();
                    await sleep(GetSpeed());    
                }
            }
    }
}

async function InsertionSort() 
{ 
    let i, key, j; 
    for (i = 1; i < numberArray.length; i++)
    { 
        key = numberArray[i]; 
        j = i - 1; 
        while (j >= 0 && numberArray[j] > key)
        { 
            numberArray[j + 1] = numberArray[j]; 
            j = j - 1; 
        } 
        numberArray[j + 1] = key; 
        Draw();
        await sleep(GetSpeed());
    } 
} 

function GetSpeed(){
    let value = document.querySelector('input[name="speed"]:checked').value;
    if(value == 'custom')
        return document.getElementById('customSpeed').value;
    return value
}

document.getElementById('StartButton').addEventListener('click',function(){
    SetResetArray();
    let selectBoxValue = document.getElementById('select').value;
    switch(selectBoxValue){
        case "BubbleSort":
            BubbleSort();
            break;
        case "InsertSort":
            InsertionSort();
            break;
    }
})


