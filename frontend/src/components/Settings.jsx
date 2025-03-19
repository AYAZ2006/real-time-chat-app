import React,{useState,useContext} from 'react'
import {Switch,Button} from 'antd'
import {useTranslation} from 'react-i18next'
function Settings() {
  const[section,setSection]=useState(null)
  const[ison,setIson]=useState(false)
  const{t,i18n}=useTranslation()
  const[selectedLang,setSelectedLang]=useState(i18n.language || 'english')
  const[theme,setTheme]=useState(localStorage.getItem('theme')||'light')
  const handleSelectChange=(event)=>{
    setSelectedLang(event.target.value)
  }
  const saveLanguageChange=()=>{
    i18n.changeLanguage(selectedLang)
    alert(t('settings_updated'))
  }
  const toggleSection=(section)=>{
    setSection((prev)=>(prev===section?null:section))
  }
  const toggleTheme=()=>{
    const newTheme=(theme==='light'?'dark':'light')
    setTheme(newTheme)
    localStorage.setItem('theme',newTheme)
    if(newTheme==='dark'){
      document.body.style.backgroundColor='#343541'
      document.body.style.color='#ECECF1'
    }
    else{
      document.body.style.backgroundColor='#ffffff'
      document.body.style.color='#202123'
    }
  }
  return (
    <div id="set">
      <div id="open">
        <h3 id="stop">{t('settings')}</h3>
        <button id="general" onClick={()=>toggleSection('general')}>{t('general')}</button>
        <button id="account" onClick={()=>toggleSection('account')}>{t('account')}</button>
        <button id="notify" onClick={()=>toggleSection('notifications')}>{t('notifications')}</button>
        <button id="changes" onClick={()=>toggleSection('personalizations')}>{t('personalizations')}</button>
        <button id="mode" onClick={()=>toggleSection('chat_settings')}>{t('chat_settings')}</button>
        <button id="help" onClick={()=>toggleSection('help_support')}>{t('help_support')}</button>
      </div>
      <div id="close">
        {section==='general' && (
          <div id="genopen">
            <select id="langs" value={selectedLang} onChange={handleSelectChange}>
              <option value="hindi">हिन्दी</option>
              <option value="english">English</option>
              <option value="telugu">తెలుగు</option>
              <option value="arabic">العربية</option>
            </select>
            <div id="auto">
              <h5 id="autot">{t('auto_text_corrector')}</h5>
              <Switch id='autob' onClick={()=>setIson(!ison)}/>
            </div>
            <Button id="save" type="primary" onClick={saveLanguageChange}>{t('save')}</Button>
          </div>
        )}
        {section==='account' && (
          <div id='accopen'></div>
        )}
        {section==='notifications' && (
          <div id='notopen'></div>
        )}
        {section==='personalizations' && (
          <div id='chopen'>
            <div id='theme'>
              <h4>Theme</h4>
              <h5>App color theme</h5>
              <Switch checked={theme==='dark'} onChange={toggleTheme}></Switch>
            </div>
          </div>
        )}
        {section==='chat_settings' && (
          <div id='modeopen'></div>
        )}
        {section==='help_support' && (
          <div id='helpopen'></div>
        )}
      </div>
    </div>
  );
}

export default Settings;
