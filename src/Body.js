export default function Body({nome, idade, bool}){
    var show = idade;
    if(bool){
        show = nome;
    }

    if(nome === "Arlindo Cruz"){
        return(
            <div>
                <p>{show}</p>
                <form>
                    <label for="text-form">Meu lugar, ...:</label>
                    <input type='text' id="text-form"></input>
                </form>
            </div>
          );
    }else{
        return(
          <div>
            <p>{show}</p>
          </div>
        );
    }
}