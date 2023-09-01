import React from 'react'
import { JitsiMeeting } from '@jitsi/react-sdk';

const urlJitsi= import.meta.env.NEXT_PUBLIC_URL_JITSI
const BOTONES = [
    'microphone',
    'camera',
    'chat', 
    'tileview',
    'select-background',
    'fullscreen',
    'recording',
]
const nombreHost = 'Moderador'
const room = import.meta.env.VITE_PUBLIC_ROOM_JITSI!; // Use non-null assertion


function index() {
  return (
    <div className='w-screen h-screen'>
       <JitsiMeeting
            domain = {urlJitsi}
            roomName = {room}
            configOverwrite = {{
              disableSelfView: true,
              startWithAudioMuted: true,
              startWithVideoMuted: false,
               toolbarButtons: BOTONES,
              disableSelfViewSettings: true,
                //considerar remover la siguiente línea
                prejoinConfig: {
                  //     // When 'true', it shows an intermediate page before joining, where the user can configure their devices.
                  //     // This replaces `prejoinPageEnabled`.
                       enabled: false,
                  //     // Hides the participant name editing field in the prejoin screen.
                  //     // If requireDisplayName is also set as true, a name should still be provided through
                  //     // either the jwt or the userInfo from the iframe api init object in order for this to have an effect.
                       hideDisplayName: true,
                  //     // List of buttons to hide from the extra join options dropdown.
                  //     hideExtraJoinButtons: ['no-audio', 'by-phone'],
                   },
            }}
            interfaceConfigOverwrite={{
                APP_NAME: 'AppVideollamada',
                DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
                HIDE_INVITE_MORE_HEADER: true,
                JITSI_WATERMARK_LINK: '',
                SHOW_JITSI_WATERMARK: false,
                SET_FILMSTRIP_ENABLED: false,
                DISABLE_FOCUS_INDICATOR: true,
                VERTICAL_FILMSTRIP: true,
            }}
            userInfo = {{
              displayName: nombreHost,
              email: ''
            }}

            // onApiReady={(externalApi) => {
            //   // Save the external API instance for further use, if needed
    
            //   // Attach your custom event listeners or functions here
            //   externalApi.on('participantJoined', function (abc) {
            //     // console.log('Participant Joined:', abc);
            //     // console.log( externalApi.getParticipantsInfo())
            //     let participantes = externalApi.getParticipantsInfo();

            //     participantes.forEach(participante => {
            //        console.log(participante.displayName)
            //       if(participante.displayName === nombreHost && participante.participantId != 'local'){
            //         // externalApi.pinParticipant(participante.participantId );

            //         externalApi.executeCommand('grantModerator', participante.participantId);

            //       }
            //     });
            //   });
    
            //   // Call the function to fetch rooms info
            //   // externalApi.getParticipantsInfo();
            // }}

            getIFrameRef = { (iframeRef) => { iframeRef.style.height = 'inherit'; iframeRef.style.border = '0'; } }
          />
    </div>
  )
}

export default index