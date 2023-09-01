import React from 'react'
import { JitsiMeeting } from '@jitsi/react-sdk';
import { useParams } from "react-router-dom";

const urlJitsi= import.meta.env.VITE_PUBLIC_URL_JITSI
const BOTONES = [
    // 'microphone',
    // 'camera',
    // 'chat', 
    // 'tileview',
    // 'select-background',
    // 'fullscreen',
    // 'recording',
]
const nombreHost = 'moderador'
const room = import.meta.env.VITE_PUBLIC_ROOM_JITSI!; // Use non-null assertion


export default function Page() {

  const { id } = useParams();

  console.log('Name from params:', id);

    return (
        <div className='w-screen h-screen'>
           <JitsiMeeting
                domain = {urlJitsi}
                roomName = {room}
                configOverwrite = {{
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
        //     hideDisplayName: false,
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
                }}
                userInfo = {{
                  displayName: id,
                  email:''
              }}
              onApiReady={(externalApi) => {
                // Save the external API instance for further use, if needed
                // externalApi.executeCommand('toggleTileView');
    
                // Attach your custom event listeners or functions here
                externalApi.on('participantJoined', function (abc) {
                  console.log('Participant Joined:', abc);
                  console.log( externalApi.getParticipantsInfo())
                  let participantes = externalApi.getParticipantsInfo();
    
                  participantes.forEach(participante => {
                    // console.log(participante.displayName)
                    if(participante.displayName === nombreHost){
                      externalApi.pinParticipant(participante.participantId );
                      externalApi.executeCommand('grantModerator', participante.participantId);
                    }
                  });
                });
      
                externalApi.on('filmstripDisplayChanged', (event: any) => {
                  if (event.visible) {
                    externalApi.executeCommand('toggleFilmStrip');
                  }
              });
                // Call the function to fetch rooms info
                // externalApi.getParticipantsInfo();
              }}
                getIFrameRef = { (iframeRef) => { iframeRef.style.height = 'inherit'; iframeRef.style.border = '0'; } }
              />
        </div>
      )
}