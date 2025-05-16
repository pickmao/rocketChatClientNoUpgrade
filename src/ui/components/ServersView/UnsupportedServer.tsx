import {
  Box,
  Button,
  States,
  StatesActions,
  StatesIcon,
  StatesSubtitle,
  StatesTitle,
} from '@rocket.chat/fuselage';
import { ipcRenderer } from 'electron';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import * as urls from '../../../urls';

type UnsupportedServerProps = {
  isSupported: boolean | undefined;
  instanceDomain: string;
};

const UnsupportedServer = ({
  isSupported,
  instanceDomain,
}: UnsupportedServerProps) => {
  const { t } = useTranslation();
  const [userBypass, setUserBypass] = useState(false);

  const handleMoreInfoButtonClick = (): void => {
    ipcRenderer.invoke(
      'server-view/open-url-on-browser',
      urls.docs.supportedVersions
    );
  };

  const handleContinueAnyway = (): void => {
    setUserBypass(true);
  };

  if (userBypass) {
    return null;
  }

  return (
    <>
      {isSupported === false && (
        <Box
          backgroundColor='surface-light'
          display='flex'
          flexDirection='column'
          width='100vw'
          justifyContent='center'
          alignItems='center'
          zIndex={1}
        >
          <States>
            <StatesIcon name='warning' />
            <StatesTitle>
              {t('unsupportedServer.title', {
                instanceDomain,
              })}
            </StatesTitle>
            <StatesSubtitle>
              {t('unsupportedServer.announcement')}
            </StatesSubtitle>
            <StatesActions>
              <Button secondary onClick={handleMoreInfoButtonClick} marginInlineEnd={8}>
                {t('unsupportedServer.moreInformation')}
              </Button>
              <Button primary onClick={handleContinueAnyway}>
                继续使用
              </Button>
            </StatesActions>
          </States>
        </Box>
      )}
    </>
  );
};

export default UnsupportedServer;
