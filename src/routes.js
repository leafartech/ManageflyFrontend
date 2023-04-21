import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Registrar from './pages/Registrar'
import Entrar from "pages/Entrar";
import Tasks from "pages/Tarefas";
import { UserProvider } from './context/UserContext'
import Sair from "pages/Sair";
import Projetos from "pages/Projetos";
import ProjetosAdicionar from "pages/ProjetosAdicionar";
import SpectProject from "pages/SpecProject";
import ProjectData from "pages/ProjectData";
import Financas from "pages/Financas";
import LP from "pages/LP"
import { NotificationProvider } from "context/NotificationContext";


function AppRoutes() {
    return (
        <NotificationProvider>
            <UserProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/inicio" element={ <LP /> } />

                        <Route path="/" element={ <Inicio /> } />
                        <Route path="/projetos" element={ <Projetos /> } />
                        <Route path="/projetos/criar" element={ <ProjetosAdicionar /> } />
                        <Route path="/projetos/:id" element={ <SpectProject /> } />
                        <Route path="/projetos/:id/dados" element={ <ProjectData /> } />

                        <Route path="/financas" element={ <Financas /> } />
                        
                        <Route path="/tarefas" element={ <Tasks /> } />
                        
                        <Route path="/registrar" element={ <Registrar /> } />
                        
                        <Route path="/entrar" element={ <Entrar /> } />
                        <Route path="/sair" element={ <Sair /> } />

                        {/* Implementar 404 */}
                    </Routes>
                </BrowserRouter>
            </UserProvider>
        </NotificationProvider>
    )
}

export default AppRoutes