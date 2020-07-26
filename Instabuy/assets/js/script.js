//Script do request da API Instabuy para mostrar os banners e os produtos 
$(document).ready(() => {
        $.ajax({
            type: 'GET',
            url: 'https://api.instabuy.com.br/apiv3/layout',
            dataType: 'json',
            data:{
                "subdomain": "organicos"
            },    
            success: function(dados) {
                //Loop que cria os banners
                for(let i in dados.data.banners){
                    let item = dados.data.banners[i]

                    let urlBanner = 'https://assets.instabuy.com.br/ib.store.banner/bnr-';

                    //Parte do código que irá criar as divs dos Banners do Carousel
                    let divBanner = document.createElement('div')

                    //Condição para definir como 'ativo' o primeiro banner, e assim realizar o slide do Carousel
                    if (i==0) {
                        //Cria o Banner ativo
                        divBanner.className = 'carousel-item carousel-image-'+i+' active'
                    }else{
                        divBanner.className = 'carousel-item carousel-image-'+i
                    }
                    
                    //Criação das imagens dos Banners
                    let imgBanner = document.createElement('img')
                    imgBanner.src = urlBanner + item.image
                    imgBanner.className = 'carousel-banner-image'

                    //Adicionamos todos as imagens dos Banners dentro das divs
                    divBanner.appendChild(imgBanner)

                    //Adicionamos os elementos na página html 
                    document.getElementById('carousel_gen').appendChild(divBanner)
                }

                //Loop que cria os produtos
                for(let i in dados.data.collection_items){
                    let item = dados.data.collection_items[i]

                    //Criação das Divs
                    //Criação da da div col que vai englobar todos os elementos do item
                    let divCol = document.createElement('div')
                    //divCol.className = 'col'
                    divCol.className = 'col-10 col-sm-8 col-lg-4 mx-auto my-3'

                    //Loop para a criação das imagens dos produtos, dos nomes, e dos seus preços
                    for(let j in dados.data.collection_items[i].items){
                        let item = dados.data.collection_items[i].items[j]

                        //Criação das imagens dos produtos
                        let urlProduto = 'https://assets.instabuy.com.br/ib.item.image.medium/m-';
                        var imgProduto = document.createElement('img')
                        imgProduto.src = urlProduto + item.images[0]
                        imgProduto.className = 'card-img-top product-img'


                        //Criação das Divs
                        let divCard = document.createElement('div')
                        divCard.className = 'card single-item'

                        let imgContainer = document.createElement('div')
                        imgContainer.className = 'img-container'

                        let divCardBody = document.createElement('div')
                        divCardBody.className = 'divCardBody'

                        //Fac com que a DivCard exiba as informações uma em cima da outra como uma coluna
                        let divCardText = document.createElement('div')
                        divCardText.className = 'card-text d-flex flex-column justify-content-between text-capitalize'

                        //Criação dos nomes dos produtos
                        var p2 = document.createElement('p')
                        p2.innerHTML = '<strong>Nome:</strong> ' + item.name

                        //Criação da marca
                        let p1 = document.createElement('p')
                        p1.innerHTML = '<strong>Marca:</strong> '+ dados.data.collection_items[i].title

                        //Criação de um espaço entre os elementos
                        let hr = document.createElement('hr')
                        
                        //Adicionamos todos os elemntos dentro das divs
                        divCol.appendChild(divCard)
                        divCard.appendChild(imgContainer)
                        imgContainer.appendChild(imgProduto) //Adiciona as imagens dos produtos
                        divCard.appendChild(divCardBody)
                        divCardBody.appendChild(divCardText)
                        divCardText.appendChild(p1)  //Adiciona a marca(loja) dos produtos
                        divCardText.appendChild(p2)  //Adiciona o nome dos produtos
                        
                        

                        //Loop da criação dos preços dos produtos
                        for(let k in dados.data.collection_items[i].items[j].prices){
                            let item = dados.data.collection_items[i].items[j].prices[k]

                            //Criação dos preços dos produtos
                            var p3 = document.createElement('p')
                            p3.innerHTML = '<strong>Preço: </strong> R$ ' + item.price
                            divCardText.appendChild(p3)  //Adiciona o preço dos produtos
                        }

                        divCol.appendChild(hr)

                    }

                    //Por fim adicionamos todos os elementos na página html 
                    document.getElementById('product-items').appendChild(divCol)
                }

            },    
            error: function(dados) {
                //Mensagem de erro caso não seja possível carregar a página.
                $('p').html('Erro! Não foi possível carregar a página, tente novamente!!');   
            }
        })
    });

//Script que cria o efeito de scroll suave pra links internos
jQuery(document).ready(function($) { 
  $(".scroll").click(function(event){        
    event.preventDefault();
    $('html,body').animate({scrollTop:$(this.hash).offset().top}, 1000);
  });
});