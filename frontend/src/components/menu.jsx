import '../styles/menu.css';
import { Category } from './category';      

export function Menu() {
    return (
        <div className="menuCategories">
            <Category titulo="Cadernos e Papéis" url="cadernos.png" />

            <Category titulo="Arte e Criatividade" url="tintas.png" />

            <Category titulo="Organização e Escritório" url="organizacao.png" />

            <Category titulo="Adesivos e Decoração" url="adesivos.png" />
        </div>
    )
}