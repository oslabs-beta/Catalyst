import React from 'react';

// import logos from assests file here

//tsx and jsx logo
import tsxLogo from '../../assets/icons/file_type_reactts.svg';

// js logo
import jsLogo from '../../assets/icons/file_type_js.svg';

// html logo
import htmlLogo from '../../assets/icons/file_type_html.svg';

// css logo
import cssLogo from '../../assets/icons/file_type_css.svg';

// ts logo
import tsLogo from '../../assets/icons/file_type_typescript.svg';

// scss logo
import scssLogo from '../../assets/icons/file_type_scss.svg';

// config logo
import configLogo from '../../assets/icons/file_type_config.svg';

// folder icon
import folderIcon from '../../assets/icons/default_folder.svg';

// json icon
import jsonIcon from '../../assets/icons/file_type_json.svg';

//babel icon
import babelIcon from '../../assets/icons/file_type_babel2.svg';



const FILE_ICONS: {[k:string]: JSX.Element} = {
  tsx: <img src={tsxLogo} />,
  jsx: <img src={tsxLogo} />,
  js: <img src={jsLogo} />,
  html: <img src={htmlLogo} />,
  css: <img src={cssLogo} />,
  ts: <img src={tsLogo} />,
  scss: <img src={scssLogo} />,
  config: <img src={jsLogo} />,
  env: < img src={configLogo} />,
  folder: < img src={folderIcon} />,
  json: <img src={jsonIcon} />,
  babel: <img src={babelIcon} />,
};



export default FILE_ICONS;