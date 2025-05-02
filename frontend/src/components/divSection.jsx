import '../styles/section.css'
import { InputBuscaGenerica } from './inputNomeGenerica'
import { MenuProdutos } from './menuProdutos.jsx'

export function Section({form, atualizarCampo}) {
    return(
        <div className="section">
            <div className="sideBar">
                <div className="filter">
                    <p className='basicText'>Categoria</p>
                    <hr className="divisorThin" />
                </div>

                <div className="filter">
                    <p className='basicText'>Valor</p>
                    <hr className="divisorThin" />
                </div>
            </div>

            <div className="secProdutos">
                <div className="pesquisaDadosManager">
                    <InputBuscaGenerica
                    tipo="filtro"
                    campoBusca="cBarra"
                    placeholder="Busque por nome ou código do produto"
                    largura="input-full"
                    value={form.cBarra}
                    onInputChange={(val) => atualizarCampo('cBarra', val)}
                    />
                </div>
                <hr className="divisor" />
                <div className="menu">
                    <MenuProdutos />
                </div>
            </div>
        </div>
    )
}