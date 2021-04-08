class UserController{
    constructor(formId,tableId){
        this.formEl = document.getElementById(formId)
        this.tableEl = document.getElementById(tableId)
        this.onSubmit();
    }
    onSubmit(){
        this.formEl.addEventListener('submit',event =>{
            event.preventDefault();
            // values recebe todos os valores retornado de get values, que são todos values dos inputs do formulario,ele sera um objeto.
            let values = this.getValues();

            this.getPhoto()
            .then(sucess =>{ // then recebe duas arrow function, a primeira da sucess , a segunda da erro.
                values.photo = sucess;
                this.addLine(values);
            },error =>{
                console.error(error)

            })            
        })
    }
    getPhoto(){

        // vamos retornar um promise , para podermos acessar ela com o then na função acima.
        return new Promise((resolve,reject)=>{
            let fileReader = new FileReader();
        // filtramos o campo input file
        let arqPhoto = [...this.formEl].filter(photos => photos.name == 'photo');
        // file recebe os atributos da imagem do campo input como,nome da imagem,tamnho etc.
        let file = arqPhoto[0].files[0];

        // o readAsdataUrl retorna a url da imagem em formato base64,para conseguirmos renderizar ela no navegador
        fileReader.readAsDataURL(file);

        //quando eu terminar de ler o a imagem,passamos o resultado para o parâmetro dessa função.
        fileReader.onload = ()=>{
                // o atributo result contem o resultado de  url da imagem em codificação base64,quando tudo carregar ela retorná.
            resolve(fileReader.result);
        };

        // se a imagem da algum erro
        fileReader.onerror = e =>{
            reject(e)
        }
        })

    }
    getValues(){
        let user = {};
        [...this.formEl.elements].forEach( field => {
            if(field.name == 'gender'){
                user[field.name] = field.value;
            }else{
                user[field.name] = field.value;
            }

        });

        return new User(
            user.name,
            user.gender,
            user.birth,
            user.country,
            user.email,
            user.password,
            user.photo,
            user.admin
        )
    }
    addLine(dataUser){
        this.tableEl.innerHTML = `
        <tr>
            <td><img src="${dataUser.photo}" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${dataUser.admin}</td>
            <td>${dataUser.birth}</td>
            <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        </tr>
        `

    }
}