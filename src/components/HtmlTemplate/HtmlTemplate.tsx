import { ReactNode } from 'react';

import { APP_NAME } from '@constants';
import { PreloadedState } from '@reduxjs/toolkit';
import { RootState } from '@store';

import favicon from '../../assets/favicon.svg';

interface HtmlTemplateProps {
  children: ReactNode;
  preloadedState: PreloadedState<RootState>;
  style?: string;
}

const HtmlTemplate = ({ children, preloadedState, style }: HtmlTemplateProps) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href={favicon} />
        {style && <link rel="stylesheet" href={style} />}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{APP_NAME}</title>
      </head>
      <body>
        <div id="root">{children}</div>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
              /</g,
              '\\u003c'
            )}`,
          }}
        />
      </body>
    </html>
  );
};

export default HtmlTemplate;
