import '../../styles/menu.css';
import { Category } from '../category and cards/card';      

export function Settings() {
    return (
        <div className="menuCategories">
            <Category titulo="Adicionar Produtos" url="addProdutos.png" link="/adicionar-produtos" />
            <Category titulo="Adicionar Categorias" url="addCategory.png" link="/adicionar-categorias" />
            <Category titulo="Consultar Estoque" url="estoque.png" link="/gerenciar-produtos" />
            <Category titulo="Gerenciar Colaboradores" url="acessos.png" link="/gerenciar-colaboradores" />
            <Category titulo="Ajustes do Sistema" url="settings.png" link="/ajustes" />
        </div>
    )
}
