<div>
    {{!-- <h1 style="color: blue">Hola {{name}}</h1>
    <h1>ahora con Websockets</h1> --}}
</div>
    {{!-- <form id="myForm" action="" >
        <input type="text" id="title" name="texto" placeholder="title"/>
        <input type="text" id="description" name="texto" placeholder="description"/>
        <input type="text" id="code" name="texto" placeholder="code"/>
        <input type="text" id="status" name="texto" placeholder="status"/>
        <input type="text" id="stock" name="texto" placeholder="stock"/>
        <input type="text" id="category" name="texto" placeholder="category"/>
        <input type="text" id="thumbnail" name="texto" placeholder="thumbnail"/>
        <button type="submit">Enviar</button>
    </form> --}}


 /*socket.on('todos', (data) => {
        let listaProductos = document.getElementById("listProductsLive");
        listaProductos.innerHTML = data;

        console.log(data)
    });
    */

      {{!-- formulario.addEventListener('submit', function (event) {
        
        event.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const code = document.getElementById('code').value;
        const status = document.getElementById('status').value;
        const stock = document.getElementById('stock').value;
        const category = document.getElementById('category').value;
        const thumbnail = document.getElementById('thumbnail').value;

        const product = {title, description, code, status, stock, category, thumbnail}

        socket.emit('newProduct', product)
    }); --}}