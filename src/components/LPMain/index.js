import LPTitles from 'components/LPTitles'
import styles from './LPMain.module.css'
import LPHero from 'components/LPHero'
import LPList from 'components/LPList'
import { NavLink } from 'react-router-dom'

export default function LPMain() {
    return(
        <main className={ styles.main }>
            <section>
                <LPTitles title="Já pensou em gerenciar tudo em um só lugar?" topTitle="Plataforma completa" paragraph="A managefly é um sistema desenvolvido e otimizado para tornar a gestão de qualquer negócio mais fácil" />
                <LPHero path="../images/LP/hero.png" side="" title="hero img" >
                    <ul>
                        <LPList path="./images/LP/item/1.png" subtitle="Oferecemos 14 dias para você testar e se apaixonar pela plataforma. Ah, e pode ficar tranquilo, não precisa do cartão de crédito!" title="Crie sua conta gratuita">
                        </LPList>
                        <LPList path="./images/LP/item/2.png" subtitle="Saiba exatamente as tarefas que precisam ser feitas e até qual o prazo para conseguir maximizar a sua produtivdade." title="Gerencie o seu tempo">
                        </LPList>
                        <LPList path="./images/LP/item/3.png" subtitle="Temos certeza que após testar a nossa plataforma pela primeira vez você não vai conseguir viver mais sem ela!" title="Fique encantado">
                        </LPList>
                    </ul>
                </LPHero>
            </section>
            <section>
                <LPTitles title="Organização nunca mais será um problema" topTitle="Funcionalidades principais" paragraph="A managefly é um sistema desenvolvido e otimizado para tornar a gestão de qualquer negócio mais fácil"/>
                
            </section>
            <section>
                <LPHero path="../images/LP/hero3.png" title="hero img" side={ true }>
                    <LPTitles align="left" title="Aumente a sua produtividade" paragraph="Saiba exatamente as tarefas que precisam ser feitas para cumprir os seus projetos" topTitle="Otimização" />
                    <div className={ styles.sides }>
                        <p>Gestão completa de projetos</p>
                        <p>Saiba exatamente o que fazer</p>
                        <p>Centralize a gestão dos seus projetos</p>
                    </div>
                </LPHero>
            </section>
            <section>
                <LPHero path="../images/LP/hero4.png" title="hero img">
                    <LPTitles align="left" title="Nunca foi tão fácil gerir um projeto" topTitle="Planeje, inicie, conclua"/>
                    <ul>
                        <LPList size={ true } path="./images/LP/check.png" subtitle="Faça o planejamento completo do seu projeto: defina o objetivo, datas, tarefas, orçamento, aribua a um cliente..." />
                        <LPList size={ true } path="./images/LP/check.png" subtitle="Inicie o projeto, crie tarefas, defina prazos e faça atualizações nos dados sempre que precisar!" />
                        <LPList size={ true } path="./images/LP/check.png" subtitle="Mude o status do projeto para completo quando você finalizá-lo e registre uma movimentação financeira." />
                    </ul>
                </LPHero>
            </section>
            <section className={ styles.top }>
                <LPTitles paragraph="Se sentir necessidade de alguma alteração no valor do plano, por favor, entre em contato com nosso suporte. Ficaremos felizes em te ajudar" title="Nossos Planos" topTitle="Atenção"/>
                <div className={ styles.payment }>
                    <p>Favorito</p>
                    <h5>
                        <span className={ styles.top }>R$</span>
                        0
                        <span className={ styles.bottom }>/mês</span>
                    </h5>
                    <h6>Acesso completo à plataforma</h6>
                    <NavLink to="/registrar">Adquirir agora</NavLink>
                </div>
            </section>
        </main>
    )
}