import '../styles/menu.css';
import { Category } from './category';      

export function Settings() {
    return (
        <div className="menuCategories">
            <Category titulo="Adicionar Produtos" url="addProdutos.png" link="/adicionar-produtos" />
            <Category titulo="Adicionar Categorias" url="addCategory.png" link="/adicionar-categorias" />
            <Category titulo="Consultar Estoque" url="estoque.png" link="/consultar-estoque" />
            <Category titulo="Gerenciar Colaboradores" url="acessos.png" link="/gerenciar-colaboradores" />
            <Category titulo="Ajustes do Sistema" url="settings.png" link="/ajustes" />
        </div>
    )
}
