import { memo, useEffect, useRef, useState } from 'react';
import { checkFunction, loginFunction } from './http/userAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAction } from './store/reducers/userReducer';
import { getDevices, getSave } from './http/deviceAPI';
import { setElementsAction, setImagesAction, setSettignsAction } from './store/reducers/elementsReducer';
import { setCopyAction, setDeivcesAction} from './store/reducers/deviceReducer';
import LoginPage from './components/Login/LoginPage';
import TopMenu from './components/Common/TopMenu';
import AdminPanel from './components/Admin/AdminPanel';
import Main from './components/Common/Main';
import './styles/App.css';
export default memo(function App() {
  const [isAuth,setIsAuth] = useState(false);
  const [loading,setLoading] = useState(true);
  const mainRef = useRef();
  const topRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector(state=>state.user.user)
  const settings = useSelector(state=>state.elements.settings)
  useEffect(() => {  
      try {
        checkFunction().then(data=>{
          const newUser = {login:data.login,role:data.role,editMode:data.role==="EDITOR"?true:false};
          dispatch(setUserAction(newUser));
          setIsAuth(true);
        })
      } catch (e) {
        alert(e?.response?.data?.message)
      }
      try {
        getSave().then(data=>{
          const loadedElements = JSON.parse(data.data.data[0].elements);
          dispatch(setElementsAction(loadedElements.elements))
          dispatch(setImagesAction(loadedElements.images))
          dispatch(setSettignsAction(loadedElements.settings))
        });
      } catch (e) {
        alert(e?.response?.data?.message)
      }
      try {
        getDevices().then(data=>{
          const devicesArr = data.data;
          devicesArr.forEach(device => {
            const holdRegs = JSON.parse(device.holdingRegisters);
            device.holdingRegisters = holdRegs;
            const inpRegs = JSON.parse(device.inputRegisters);
            device.inputRegisters = inpRegs;
            const coils = JSON.parse(device.coils);
            device.coils = coils;
          });
          dispatch(setDeivcesAction(devicesArr))
          dispatch(setCopyAction(devicesArr))
        }).finally(()=>{setLoading(false)
        });
      } catch (e) {
        alert(e?.response?.data?.message)
      }

      setInterval(() => {
        try {
          getDevices().then(data=>{
            const devicesArr = data.data;
            console.log(devicesArr);
            devicesArr.forEach(device => {
              const holdRegs = JSON.parse(device.holdingRegisters);
              device.holdingRegisters = holdRegs;
              const inpRegs = JSON.parse(device.inputRegisters);
              device.inputRegisters = inpRegs;
              const coils = JSON.parse(device.coils);
              device.coils = coils;
            });
            dispatch(setDeivcesAction(devicesArr))
          });
        } catch (e) {
          alert(e?.response?.data?.message)
        }
      }, 1000);
  }, [])
  useEffect(()=>{
    if(!loading){
      if(mainRef.current&&topRef.current){
        mainRef.current.style.background = settings.mainBackground;
        topRef.current.style.background = settings.topBackground;
      }
    }
  })

  const logIn = async(login,password)=>{
    try {
      const response = await loginFunction(login,password)
      const newUser = {login:response.login,role:response.role,editMode:response.role==="EDITOR"?true:false};
      dispatch(setUserAction(newUser));
      setIsAuth(true);
    } catch (e) {

      alert(e.response.data.message)
    }
    
  }
  const logOut = (e)=>{
    localStorage.removeItem('token')
    setIsAuth(false);
  }

  if(loading)return(
    <h1>Надо добавить спинер</h1>
  )

  return (
    <div className="App">
      {
        isAuth
        ?
        user.role==="ADMIN"
        ?
        <AdminPanel logOut = {logOut} />
        :
        <>
        <TopMenu topRef = {topRef} logOut = {logOut}/>
        <Main mainRef = {mainRef}/>
        </>
        :
        <LoginPage logIn = {logIn} />
      }
    </div>
  );
})
