function canvas(selector, options){
    const canvas = document.querySelector(selector);
    canvas.classList.add('canvas')
    canvas.setAttribute('width', `${options.width || 400}px`)
    canvas.setAttribute('height', `${options.height || 300}px`)


    // отримання контексту для малювання
    const context = canvas.getContext('2d')
    // отримуємо координати canvas відносно viewport
    const rect = canvas.getBoundingClientRect();

    // ...

    let isPaint = false // чи активно малювання
    let points = [] //масив з точками

// об’являємо функцію додавання точок в масив
    const addPoint = (x, y, dragging) => {
        // преобразуємо координати події кліка миші відносно canvas
        points.push({
            x: (x - rect.left),
            y: (y - rect.top),
            dragging: dragging
        })
    }

// головна функція для малювання
    const redraw = () => {
        //очищуємо  canvas
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        context.strokeStyle = options.strokeColor;
        context.lineJoin = "round";
        context.lineWidth = options.strokeWidth;
        let prevPoint = null;
        for (let point of points){
            context.beginPath();
            if (point.dragging && prevPoint){
                context.moveTo(prevPoint.x, prevPoint.y)
            } else {
                context.moveTo(point.x - 1, point.y);
            }
            context.lineTo(point.x, point.y)
            context.closePath()
            context.stroke();
            prevPoint = point;
        }
    }

// функції обробники подій миші
    const mouseDown = event => {
        isPaint = true
        addPoint(event.pageX, event.pageY);
        redraw();
    }

    const mouseMove = event => {
        if(isPaint){
            addPoint(event.pageX, event.pageY, true);
            redraw();
        }
    }

// додаємо обробку подій
    canvas.addEventListener('mousemove', mouseMove)
    canvas.addEventListener('mousedown', mouseDown)
    canvas.addEventListener('mouseup',() => {
        isPaint = false;
    });
    canvas.addEventListener('mouseleave',() => {
        isPaint = false;
    });

// TOOLBAR
    const toolBar = document.getElementById('toolbar')
// clear button
    const clearBtn = document.createElement('button')
    clearBtn.classList.add('btn')
    clearBtn.textContent = 'Clear'

    clearBtn.addEventListener('click', () => {
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            points = [];
// тут необхідно додати код очистки canvas та масиву точок (clearRect)
    })
    toolBar.insertAdjacentElement('afterbegin', clearBtn)

    const download = document.createElement('button');
    download.classList.add('btn');
    download.textContent = 'Download';

    download.addEventListener('click', () => {
        const dataUrl = canvas.toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
        const newTab = window.open('about:blank','image from canvas');
        newTab.document.write("<img src='" + dataUrl + "' alt='from canvas'/>");
    })
    toolBar.insertAdjacentElement('afterbegin', download)

    const save = document.createElement('button');
    save.classList.add('btn');
    save.textContent = 'Save';

    save.addEventListener('click', () => {
        localStorage.setItem ('points', JSON.stringify(points));
    })
    toolBar.insertAdjacentElement('afterbegin', save)

    localStorage.setItem('points', JSON.stringify(points));

    const restore = document.createElement('button');
    restore.classList.add('btn');
    restore.textContent = 'Restore';

    restore.addEventListener('click', () => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        points = [];
        points = JSON.parse(localStorage.getItem("points"));
        redraw();
    })
    toolBar.insertAdjacentElement('afterbegin', restore)

    const time = document.createElement('button');
    time.classList.add('btn');
    time.textContent = 'Time';

    time.addEventListener('click', () => {
        let data = new Date();
        context.strokeText(data.toString(), 0, 20);
    })
    toolBar.insertAdjacentElement('afterbegin', time)

    const brushColor = document.createElement('button');
    brushColor.classList.add('btn');
    brushColor.textContent = 'Color';

    brushColor.addEventListener('click', changeColor);

    function changeColor () {
        //сделать смену цвета
    }

    toolBar.insertAdjacentElement('afterbegin', brushColor)

    const brushSize = document.createElement('button');
    brushSize.classList.add('btn');
    brushSize.textContent = 'Size';

    brushSize.addEventListener('click', () => {

    })

    toolBar.insertAdjacentElement('afterbegin', brushSize)
}