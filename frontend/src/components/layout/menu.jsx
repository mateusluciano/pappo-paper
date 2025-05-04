import '../../styles/menu.css';
import { Category } from '../category and cards/card';      

export function Menu() {
    return (
        <div className="menuCategories">
            <Category titulo="Cadernos e Papéis" url="cadernos.png" classe="category"/>

            <Category titulo="Arte e Criatividade" url="tintas.png" classe="category"/>

            <Category titulo="Organização e Escritório" url="organizacao.png" classe="category"/>

            <Category titulo="Adesivos e Decoração" url="adesivos.png" classe="category"/>
        </div>
    )
}