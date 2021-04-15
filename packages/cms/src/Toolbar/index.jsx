import React from 'react';
import { Clickable, Menu } from '@firepress/ui';

import useSessionStorage from '../hooks/useSessionStorage';

const Toolbar = ({ user, children }) => {
  const isEditingEnabled = user?.claims?.editor || false;
  const [mode, setMode] = useSessionStorage('mode', 'live');

  if (!isEditingEnabled) return null;

  document.documentElement.style.cssText = isEditingEnabled ? 'padding-top: 3rem !important;' : 'padding-top: 0 !important;';

  const handleChangeMode = (e) => {
    setMode(e.target.value);
  }

  return (
    <div className="fp-cms__toolbar">
      <span>Firepress CMS</span>
      <div className="fp-cms__toolbar__options">
        <div className="fp-cms__toolbar__mode">
          <span>Mode:</span>
          <div>
            <select value={mode} onChange={handleChangeMode}>
              <option value="live">Live</option>
              <option value="edit">Edit</option>
              <option value="preview">Preview</option>
            </select>
          </div>
        </div>
        {children && (
          <div>
            <Menu
              autoAdjustPosition
              keepInDom
              buttonComponent={(
                <Clickable
                  aria-label="Tools Menu"
                  as="button"
                  className="fp-cms__toolbar__menu-button"
                  styledAs="none"
                >
                  ☰
                </Clickable>
              )}
              containerClassName="fp-cms__toolbar__menu"
              position="bottomRight"
              render={() => (
                <div className="">
                  {children}
                </div>
              )}
            />
          </div>
        )}
      </div>
    </div> 
  );
}

export default Toolbar;
