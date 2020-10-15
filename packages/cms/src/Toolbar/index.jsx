import React from 'react';
import parseUrl from 'url-parse';
import { Clickable, Menu } from '@firepress/ui';

const Toolbar = ({ user, children }) => {
  let isEditing = false;
  const isEditingEnabled = user?.claims?.editor || false;

  if (!!user && isEditingEnabled) {
    document.documentElement.style.cssText = editorIsEnabled ? `
      padding-top: 3rem !important;
    ` : '';
    const { query: { edit } } = parseUrl(window.location.href, true);
    isEditing = edit === 'true'
  }

  const handleChangeMode = (e) => {
    const edit = e.target.value === 'edit';
    const parsedUrl = parseUrl(window.location.href, '/', true);
    parsedUrl.set('query', {
      ...parsedUrl.query,
      edit,
    });
    window.location.replace(parsedUrl.href);
  }

  return (isEditingEnabled) ? (
    <div className="fp-cms__toolbar">
      <span>Firepress CMS</span>
      <div className="fp-cms__toolbar__options">
        <div className="fp-cms__toolbar__mode">
          <span>Mode:</span>
          <div>
            <select value={isEditing ? 'edit' : 'live'} onChange={handleChangeMode}>
              <option value="live">Live</option>
              <option value="edit">Edit</option>
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
  ) : null;
}

export default Toolbar;
