import './MenuLink.css'
import MyLink from '../MyLink'
import { useContext, useEffect, useRef, useState } from 'react'
import { NotificationContext } from 'context/NotificationContext'
import { NavLink } from 'react-router-dom'

const MenuLink = ({ notificationActived }) => {
    const [ hamburguerActived, setHamburguerActived ] = useState('')
    const [ notificationAct, setNotification ] = useState(false)
    const { readNotification, cleanNotification } = useContext(NotificationContext)
    const [ notifications, setNotifications ] = useState([])
    const [ counter, setCounter ] = useState(0)

    useEffect(() => {
        setNotifications(readNotification())
    }, [counter])

    function unloadScrollBars() {
        console.log('aqi')
        if (notificationAct) {
            document.documentElement.style.overflow = 'scroll';
            document.body.scroll = "yes"; // IE
        } else {
            document.documentElement.style.overflow = 'hidden';
            document.body.scroll = "no"; // IE
        }
    }

    function MenuOpen() {
        if (hamburguerActived === 'active') {
            setHamburguerActived('')
        } else {
            setHamburguerActived('active')
        }
    }

    function notificationClicked(e) {
        if (notificationAct === true) {
            setNotification(false)
        } else {
            setNotification(true)
        }
    }
    function notificationClickedMobile(e) {
        if (notificationAct === true) {
            setNotification(false)
        } else {
            setNotification(true)
        }
        unloadScrollBars()
    }
    function render(area, data, name, url, index) {
        if (area === 'newProject') {
            return (
                <NavLink key={ index } to={`/projetos/:${url}`}>
                    <div className="div-svg">
                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M22.485,10.975,12,17.267,1.515,10.975A1,1,0,1,0,.486,12.69l11,6.6a1,1,0,0,0,1.03,0l11-6.6a1,1,0,1,0-1.029-1.715Z"/><path d="M22.485,15.543,12,21.834,1.515,15.543A1,1,0,1,0,.486,17.258l11,6.6a1,1,0,0,0,1.03,0l11-6.6a1,1,0,1,0-1.029-1.715Z"/><path d="M12,14.773a2.976,2.976,0,0,1-1.531-.425L.485,8.357a1,1,0,0,1,0-1.714L10.469.652a2.973,2.973,0,0,1,3.062,0l9.984,5.991a1,1,0,0,1,0,1.714l-9.984,5.991A2.976,2.976,0,0,1,12,14.773ZM2.944,7.5,11.5,12.633a.974.974,0,0,0,1,0L21.056,7.5,12.5,2.367a.974.974,0,0,0-1,0h0Z"/></svg>

                    </div>
                    <div className="notification-text">
                        <span className="text-top"><span className="color-normal">Projeto</span></span>
                        <span className="text-middle">O projeto <span className="color-normal">{name}</span> foi criado com sucesso.</span>
                        <span className="text-bottom">
                            {/* <svg className="color-normal" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M19,2H18V1a1,1,0,0,0-2,0V2H8V1A1,1,0,0,0,6,1V2H5A5.006,5.006,0,0,0,0,7V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V7A5.006,5.006,0,0,0,19,2ZM2,7A3,3,0,0,1,5,4H19a3,3,0,0,1,3,3V8H2ZM19,22H5a3,3,0,0,1-3-3V10H22v9A3,3,0,0,1,19,22Z"/><circle cx="12" cy="15" r="1.5"/><circle cx="7" cy="15" r="1.5"/><circle cx="17" cy="15" r="1.5"/></svg> */}
                            <span>{data}</span>
                        </span>
                    </div>
                </NavLink>
            )
        } else if (area === 'excludeProject') {
            return (
                <NavLink style={{ pointerEvents: 'none'}}>
                    <div className="div-svg">
                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M22.485,10.975,12,17.267,1.515,10.975A1,1,0,1,0,.486,12.69l11,6.6a1,1,0,0,0,1.03,0l11-6.6a1,1,0,1,0-1.029-1.715Z"/><path d="M22.485,15.543,12,21.834,1.515,15.543A1,1,0,1,0,.486,17.258l11,6.6a1,1,0,0,0,1.03,0l11-6.6a1,1,0,1,0-1.029-1.715Z"/><path d="M12,14.773a2.976,2.976,0,0,1-1.531-.425L.485,8.357a1,1,0,0,1,0-1.714L10.469.652a2.973,2.973,0,0,1,3.062,0l9.984,5.991a1,1,0,0,1,0,1.714l-9.984,5.991A2.976,2.976,0,0,1,12,14.773ZM2.944,7.5,11.5,12.633a.974.974,0,0,0,1,0L21.056,7.5,12.5,2.367a.974.974,0,0,0-1,0h0Z"/></svg>
               
                    </div>
                    <div className="notification-text">
                        <span className="text-top"><span className="color-exclude">Projeto</span></span>
                        <span className="text-middle">O projeto <span className="color-exclude">{name}</span> foi excluído.</span>
                        <span className="text-bottom">
                            {/* <svg className="color-exclude" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M19,2H18V1a1,1,0,0,0-2,0V2H8V1A1,1,0,0,0,6,1V2H5A5.006,5.006,0,0,0,0,7V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V7A5.006,5.006,0,0,0,19,2ZM2,7A3,3,0,0,1,5,4H19a3,3,0,0,1,3,3V8H2ZM19,22H5a3,3,0,0,1-3-3V10H22v9A3,3,0,0,1,19,22Z"/><circle cx="12" cy="15" r="1.5"/><circle cx="7" cy="15" r="1.5"/><circle cx="17" cy="15" r="1.5"/></svg> */}
                            <span>{data}</span>
                        </span>
                    </div>
                </NavLink>
            )
        } else if (area === 'newTask') {
            return (
                <NavLink to={`/projetos/:${url}`}>
                    <div className="div-svg">
                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M22.485,10.975,12,17.267,1.515,10.975A1,1,0,1,0,.486,12.69l11,6.6a1,1,0,0,0,1.03,0l11-6.6a1,1,0,1,0-1.029-1.715Z"/><path d="M22.485,15.543,12,21.834,1.515,15.543A1,1,0,1,0,.486,17.258l11,6.6a1,1,0,0,0,1.03,0l11-6.6a1,1,0,1,0-1.029-1.715Z"/><path d="M12,14.773a2.976,2.976,0,0,1-1.531-.425L.485,8.357a1,1,0,0,1,0-1.714L10.469.652a2.973,2.973,0,0,1,3.062,0l9.984,5.991a1,1,0,0,1,0,1.714l-9.984,5.991A2.976,2.976,0,0,1,12,14.773ZM2.944,7.5,11.5,12.633a.974.974,0,0,0,1,0L21.056,7.5,12.5,2.367a.974.974,0,0,0-1,0h0Z"/></svg>

                    </div>
                    <div className="notification-text">
                        <span className="text-top"><span className="color-normal">Projeto</span></span>
                        <span className="text-middle">A tarefa <span className="color-normal">{name}</span> foi adicionada.</span>
                        <span className="text-bottom">
                            {/* <svg className="color-normal" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M19,2H18V1a1,1,0,0,0-2,0V2H8V1A1,1,0,0,0,6,1V2H5A5.006,5.006,0,0,0,0,7V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V7A5.006,5.006,0,0,0,19,2ZM2,7A3,3,0,0,1,5,4H19a3,3,0,0,1,3,3V8H2ZM19,22H5a3,3,0,0,1-3-3V10H22v9A3,3,0,0,1,19,22Z"/><circle cx="12" cy="15" r="1.5"/><circle cx="7" cy="15" r="1.5"/><circle cx="17" cy="15" r="1.5"/></svg> */}
                            <span>{data}</span>
                        </span>
                    </div>
                </NavLink>
            )
        } else if (area === 'newFinance') {
            return (
                <NavLink to={`/financas`}>
                    <div className="div-svg">
                        <svg className="color" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M23,22H5a3,3,0,0,1-3-3V1A1,1,0,0,0,0,1V19a5.006,5.006,0,0,0,5,5H23a1,1,0,0,0,0-2Z"/><path d="M6,20a1,1,0,0,0,1-1V12a1,1,0,0,0-2,0v7A1,1,0,0,0,6,20Z"/><path d="M10,10v9a1,1,0,0,0,2,0V10a1,1,0,0,0-2,0Z"/><path d="M15,13v6a1,1,0,0,0,2,0V13a1,1,0,0,0-2,0Z"/><path d="M20,9V19a1,1,0,0,0,2,0V9a1,1,0,0,0-2,0Z"/><path d="M6,9a1,1,0,0,0,.707-.293l3.586-3.586a1.025,1.025,0,0,1,1.414,0l2.172,2.172a3,3,0,0,0,4.242,0l5.586-5.586A1,1,0,0,0,22.293.293L16.707,5.878a1,1,0,0,1-1.414,0L13.121,3.707a3,3,0,0,0-4.242,0L5.293,7.293A1,1,0,0,0,6,9Z"/></svg>
                    </div>
                    <div className="notification-text">
                        <span className="text-top"><span className="color-normal">Finanças</span></span>
                        <span className="text-middle">Nova movimentação no valor de <span className="color-normal">R${name}</span> foi registrada.</span>
                        <span className="text-bottom">
                            {/* <svg className="color-normal" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M19,2H18V1a1,1,0,0,0-2,0V2H8V1A1,1,0,0,0,6,1V2H5A5.006,5.006,0,0,0,0,7V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V7A5.006,5.006,0,0,0,19,2ZM2,7A3,3,0,0,1,5,4H19a3,3,0,0,1,3,3V8H2ZM19,22H5a3,3,0,0,1-3-3V10H22v9A3,3,0,0,1,19,22Z"/><circle cx="12" cy="15" r="1.5"/><circle cx="7" cy="15" r="1.5"/><circle cx="17" cy="15" r="1.5"/></svg> */}
                            <span>{data}</span>
                        </span>
                    </div>
                </NavLink>
            )
        } else if (area === 'excludeFinance') {
            return (
                <NavLink style={{ pointerEvents: 'none'}}>
                    <div className="div-svg">
                        <svg className="color-red" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M23,22H5a3,3,0,0,1-3-3V1A1,1,0,0,0,0,1V19a5.006,5.006,0,0,0,5,5H23a1,1,0,0,0,0-2Z"/><path d="M6,20a1,1,0,0,0,1-1V12a1,1,0,0,0-2,0v7A1,1,0,0,0,6,20Z"/><path d="M10,10v9a1,1,0,0,0,2,0V10a1,1,0,0,0-2,0Z"/><path d="M15,13v6a1,1,0,0,0,2,0V13a1,1,0,0,0-2,0Z"/><path d="M20,9V19a1,1,0,0,0,2,0V9a1,1,0,0,0-2,0Z"/><path d="M6,9a1,1,0,0,0,.707-.293l3.586-3.586a1.025,1.025,0,0,1,1.414,0l2.172,2.172a3,3,0,0,0,4.242,0l5.586-5.586A1,1,0,0,0,22.293.293L16.707,5.878a1,1,0,0,1-1.414,0L13.121,3.707a3,3,0,0,0-4.242,0L5.293,7.293A1,1,0,0,0,6,9Z"/></svg>                 
                    </div>
                    <div className="notification-text">
                        <span className="text-top"><span className="color-exclude">Finanças</span></span>
                        <span className="text-middle">A movimentação <span className="color-exclude">{name}</span> foi excluída.</span>
                        <span className="text-bottom">
                            {/* <svg className="color-exclude" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M19,2H18V1a1,1,0,0,0-2,0V2H8V1A1,1,0,0,0,6,1V2H5A5.006,5.006,0,0,0,0,7V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V7A5.006,5.006,0,0,0,19,2ZM2,7A3,3,0,0,1,5,4H19a3,3,0,0,1,3,3V8H2ZM19,22H5a3,3,0,0,1-3-3V10H22v9A3,3,0,0,1,19,22Z"/><circle cx="12" cy="15" r="1.5"/><circle cx="7" cy="15" r="1.5"/><circle cx="17" cy="15" r="1.5"/></svg> */}
                            <span>{data}</span>
                        </span>
                    </div>
                </NavLink>
            )
        } else if (area === 'excludeTask') {
            return (
                <NavLink key={ index } to={`/projetos/:${url}`}>
                    <div className="div-svg">
                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M7,0H4A4,4,0,0,0,0,4V7a4,4,0,0,0,4,4H7a4,4,0,0,0,4-4V4A4,4,0,0,0,7,0ZM9,7A2,2,0,0,1,7,9H4A2,2,0,0,1,2,7V4A2,2,0,0,1,4,2H7A2,2,0,0,1,9,4Z"/><path d="M20,0H17a4,4,0,0,0-4,4V7a4,4,0,0,0,4,4h3a4,4,0,0,0,4-4V4A4,4,0,0,0,20,0Zm2,7a2,2,0,0,1-2,2H17a2,2,0,0,1-2-2V4a2,2,0,0,1,2-2h3a2,2,0,0,1,2,2Z"/><path d="M7,13H4a4,4,0,0,0-4,4v3a4,4,0,0,0,4,4H7a4,4,0,0,0,4-4V17A4,4,0,0,0,7,13Zm2,7a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V17a2,2,0,0,1,2-2H7a2,2,0,0,1,2,2Z"/><path d="M20,13H17a4,4,0,0,0-4,4v3a4,4,0,0,0,4,4h3a4,4,0,0,0,4-4V17A4,4,0,0,0,20,13Zm2,7a2,2,0,0,1-2,2H17a2,2,0,0,1-2-2V17a2,2,0,0,1,2-2h3a2,2,0,0,1,2,2Z"/></svg>               
                    </div>
                    <div className="notification-text">
                        <span className="text-top"><span className="color-exclude">Tarefas</span></span>
                        <span className="text-middle">O prazo da tarefa <span className="color-exclude">{name}</span> está acabando. Amanhã é o último dia...</span>
                        <span className="text-bottom">
                            {/* <svg className="color-exclude" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M19,2H18V1a1,1,0,0,0-2,0V2H8V1A1,1,0,0,0,6,1V2H5A5.006,5.006,0,0,0,0,7V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V7A5.006,5.006,0,0,0,19,2ZM2,7A3,3,0,0,1,5,4H19a3,3,0,0,1,3,3V8H2ZM19,22H5a3,3,0,0,1-3-3V10H22v9A3,3,0,0,1,19,22Z"/><circle cx="12" cy="15" r="1.5"/><circle cx="7" cy="15" r="1.5"/><circle cx="17" cy="15" r="1.5"/></svg> */}
                            <span>{data}</span>
                        </span>
                    </div>
                </NavLink>
            )
        }
    }

    const notificationRef = useRef();
    const notificationLink = useRef()

    let width = window.screen.width

    useEffect(() => {
        function handleClickOutside(event) {
                if (parseInt(width) > 861) {
                    if (notificationRef.current && !notificationRef.current.contains(event.target) && !notificationLink.current.contains(event.target)) {
                        setNotification(false)
                }
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        if (parseInt(width) > 861) {
            return () => {
                    document.removeEventListener('mousedown', handleClickOutside);
                };
        }
    }, [notificationRef]);

    function cleanNotifications() {
        cleanNotification([])
        setCounter(counter + 1)
    }

    return (
        <div className="menu-div">
            <nav className={ `menu ${notificationAct ? 'actived' : ''}` }>
                <div className="logo-div">
                    <img className="logo" src="../../images/logo.png" alt="Logo da managefly" />
                </div>

                <div id="hamburguer" onClick={MenuOpen} className={ hamburguerActived }>
                    <div style={{ width: "70%" }} className="hambItem"></div>
                    <div style={{ width: "90%" }} className="hambItem"></div>
                    <div style={{ width: "80%" }} className="hambItem"></div>
                </div>
                { notificationActived ? 
                    <div className="notification-mobile" onClick={ e => notificationClickedMobile(e) }>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="512" height="512"><g id="_01_align_center" data-name="01 align center"><path d="M23.259,16.2l-2.6-9.371A9.321,9.321,0,0,0,2.576,7.3L.565,16.35A3,3,0,0,0,3.493,20H7.1a5,5,0,0,0,9.8,0h3.47a3,3,0,0,0,2.89-3.8ZM12,22a3,3,0,0,1-2.816-2h5.632A3,3,0,0,1,12,22Zm9.165-4.395a.993.993,0,0,1-.8.395H3.493a1,1,0,0,1-.976-1.217l2.011-9.05a7.321,7.321,0,0,1,14.2-.372l2.6,9.371A.993.993,0,0,1,21.165,17.605Z"/></g></svg>
                        {notifications.length > 9 ? 
                        <span className="badge">9+</span>
                        : <span className="badge">{notifications.length > 9}</span>}
                        
                    </div>
                    : ''
                }
                <ul className={ `${hamburguerActived} menuNormal` }>
                    <li>
                        <MyLink to="/">
                            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M23.121,9.069,15.536,1.483a5.008,5.008,0,0,0-7.072,0L.879,9.069A2.978,2.978,0,0,0,0,11.19v9.817a3,3,0,0,0,3,3H21a3,3,0,0,0,3-3V11.19A2.978,2.978,0,0,0,23.121,9.069ZM15,22.007H9V18.073a3,3,0,0,1,6,0Zm7-1a1,1,0,0,1-1,1H17V18.073a5,5,0,0,0-10,0v3.934H3a1,1,0,0,1-1-1V11.19a1.008,1.008,0,0,1,.293-.707L9.878,2.9a3.008,3.008,0,0,1,4.244,0l7.585,7.586A1.008,1.008,0,0,1,22,11.19Z"/></svg>
                            <span>Início</span>
                        </MyLink>
                    </li>
                    <li>
                        <MyLink to="/projetos">
                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M22.485,10.975,12,17.267,1.515,10.975A1,1,0,1,0,.486,12.69l11,6.6a1,1,0,0,0,1.03,0l11-6.6a1,1,0,1,0-1.029-1.715Z"/><path d="M22.485,15.543,12,21.834,1.515,15.543A1,1,0,1,0,.486,17.258l11,6.6a1,1,0,0,0,1.03,0l11-6.6a1,1,0,1,0-1.029-1.715Z"/><path d="M12,14.773a2.976,2.976,0,0,1-1.531-.425L.485,8.357a1,1,0,0,1,0-1.714L10.469.652a2.973,2.973,0,0,1,3.062,0l9.984,5.991a1,1,0,0,1,0,1.714l-9.984,5.991A2.976,2.976,0,0,1,12,14.773ZM2.944,7.5,11.5,12.633a.974.974,0,0,0,1,0L21.056,7.5,12.5,2.367a.974.974,0,0,0-1,0h0Z"/></svg>
                            <span>Projetos</span>
                        </MyLink>
                    </li>
                    <li>
                        <MyLink to="/tarefas">
                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M7,0H4A4,4,0,0,0,0,4V7a4,4,0,0,0,4,4H7a4,4,0,0,0,4-4V4A4,4,0,0,0,7,0ZM9,7A2,2,0,0,1,7,9H4A2,2,0,0,1,2,7V4A2,2,0,0,1,4,2H7A2,2,0,0,1,9,4Z"/><path d="M20,0H17a4,4,0,0,0-4,4V7a4,4,0,0,0,4,4h3a4,4,0,0,0,4-4V4A4,4,0,0,0,20,0Zm2,7a2,2,0,0,1-2,2H17a2,2,0,0,1-2-2V4a2,2,0,0,1,2-2h3a2,2,0,0,1,2,2Z"/><path d="M7,13H4a4,4,0,0,0-4,4v3a4,4,0,0,0,4,4H7a4,4,0,0,0,4-4V17A4,4,0,0,0,7,13Zm2,7a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V17a2,2,0,0,1,2-2H7a2,2,0,0,1,2,2Z"/><path d="M20,13H17a4,4,0,0,0-4,4v3a4,4,0,0,0,4,4h3a4,4,0,0,0,4-4V17A4,4,0,0,0,20,13Zm2,7a2,2,0,0,1-2,2H17a2,2,0,0,1-2-2V17a2,2,0,0,1,2-2h3a2,2,0,0,1,2,2Z"/></svg>
                            <span>Tarefas</span>
                        </MyLink>
                    </li>
                    <li>
                        <MyLink to="/financas">
                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M23,22H5a3,3,0,0,1-3-3V1A1,1,0,0,0,0,1V19a5.006,5.006,0,0,0,5,5H23a1,1,0,0,0,0-2Z"/><path d="M6,20a1,1,0,0,0,1-1V12a1,1,0,0,0-2,0v7A1,1,0,0,0,6,20Z"/><path d="M10,10v9a1,1,0,0,0,2,0V10a1,1,0,0,0-2,0Z"/><path d="M15,13v6a1,1,0,0,0,2,0V13a1,1,0,0,0-2,0Z"/><path d="M20,9V19a1,1,0,0,0,2,0V9a1,1,0,0,0-2,0Z"/><path d="M6,9a1,1,0,0,0,.707-.293l3.586-3.586a1.025,1.025,0,0,1,1.414,0l2.172,2.172a3,3,0,0,0,4.242,0l5.586-5.586A1,1,0,0,0,22.293.293L16.707,5.878a1,1,0,0,1-1.414,0L13.121,3.707a3,3,0,0,0-4.242,0L5.293,7.293A1,1,0,0,0,6,9Z"/></svg>
                            <span>Finanças</span>
                        </MyLink>
                    </li>
                    <li ref={ notificationLink } className="notification-dropside" onClick={ e => notificationClicked(e) }>
                        <div className={`notification-link ${notificationAct ? 'actived' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="512" height="512"><g id="_01_align_center" data-name="01 align center"><path d="M23.259,16.2l-2.6-9.371A9.321,9.321,0,0,0,2.576,7.3L.565,16.35A3,3,0,0,0,3.493,20H7.1a5,5,0,0,0,9.8,0h3.47a3,3,0,0,0,2.89-3.8ZM12,22a3,3,0,0,1-2.816-2h5.632A3,3,0,0,1,12,22Zm9.165-4.395a.993.993,0,0,1-.8.395H3.493a1,1,0,0,1-.976-1.217l2.011-9.05a7.321,7.321,0,0,1,14.2-.372l2.6,9.371A.993.993,0,0,1,21.165,17.605Z"/></g></svg>
                            <span>Notificações
                                { notifications.length > 0 ?
                                    notifications.length > 9 ? <div className={ `badge`}>9+</div> : <div className={ `badge`}>{ notifications.length }</div>
                                : ''}
                            </span>
                        </div>
                    </li>
                    <div className="bottom">
                        <li>
                            <MyLink to="/sair">
                                <svg style={{ transform: "rotate(180deg)" }} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M2,21V3A1,1,0,0,1,3,2H8V0H3A3,3,0,0,0,0,3V21a3,3,0,0,0,3,3H8V22H3A1,1,0,0,1,2,21Z"/><path d="M23.123,9.879,18.537,5.293,17.123,6.707l4.264,4.264L5,11l0,2,16.443-.029-4.322,4.322,1.414,1.414,4.586-4.586A3,3,0,0,0,23.123,9.879Z"/></svg>
                                <span>Sair</span>
                            </MyLink>
                        </li>
                    </div>
                </ul>
                <ul ref={notificationRef} className={ `notification-menu ${notificationAct ? 'actived' : ''}` }>
                    <div>
                        <h4>
                            <span>Notificações ({notifications.length})</span>
                            <button className="cleanNotification-btn" onClick={cleanNotifications}>limpar</button>
                        </h4>
                    </div>
                    { notifications.map((notItem, index) => (
                        render(notItem[0], notItem[1], notItem[2], notItem[3], index)
                    )) }
                </ul>
            </nav>
        </div>
    )
}

export default MenuLink