import React, { useContext, Fragment, useState, createContext, useEffect } from 'react';
import 'ionicons/icons';
import '@material-ui/core';
import _Box from '@material-ui/core/Box';
import { ChevronLeft as ChevronLeft$1, ChevronRight as ChevronRight$1, Menu } from '@material-ui/icons';
import PropTypes from 'prop-types';
import 'react-router-dom';
import styled from 'styled-components';
import { Plugins } from '@capacitor/core';
import Modal from 'react-modal';
import { toast as toast$1 } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}

var C$1 = {
  anonUser: {},
  bottomDrawerOpen: 'bottom-drawer-open',
  collapsible: {
    description: "descr-sec",
    extra1: "extra1-sec",
    extra2: "extra2-sec",
    extra3: "extra3-sec",
    map: "map-sec",
    markers: "markers-sec"
  },
  collapsibles: 'collapsibles',
  current_user: 'current_user',
  foldedCenter: 'folded-center',
  foldedLeft: 'folded-left',
  foldedRight: 'folded-right',
  horizontal: 'horizontal',
  item_types: {
    gallery: 'Gallery',
    report: 'Report',
    video: 'Video'
  },
  jwt_token: 'jwt_token',
  layout_onecol: 'onecol',
  layout_mapui: 'mapui',
  locations: {
    earth: 'earth'
  },
  map_panel_types: {
    Equirectangular: "Equirectangular",
    MapPanel: "MapPanel",
    MapPanelNoZoom: "MapPanelNoZoom",
    ThreePanelV1: "ThreePanelV1",
    ThreePanelV4: "ThreePanelV4"
  },
  names: {
    scratchpad: 'Scratchpad'
  },
  rated: {
    nc17: 'nc-17'
  },
  ratedConfirmation: 'rated-confirmation',
  theme: 'theme',
  themes: {
    dark: 'dark',
    light: 'light'
  },
  twofoldPercent: 'twofold-percent',
  variants: {
    bordered: 'bordered',
    floating: 'floating',
    inline: 'inline',
    transparent: 'transparent'
  },
  vertical: 'vertical'
};

var RegisterWithEmailBtn = function RegisterWithEmailBtn(props) {
  return /*#__PURE__*/React.createElement(Btn, props, "Register with Email");
};

var LoginWithEmailBtn = function LoginWithEmailBtn(props) {
  return /*#__PURE__*/React.createElement(Btn, props, "Login with Email");
};

var AuthWidget = function AuthWidget(props) {
  logg(props, 'AuthWidget');

  var _useContext = useContext(AuthContext),
      currentUser = _useContext.currentUser,
      setCurrentUser = _useContext.setCurrentUser,
      setLoginModalOpen = _useContext.setLoginModalOpen,
      setRegisterModalOpen = _useContext.setRegisterModalOpen;

  logg(useContext(AuthContext), 'AuthWidgetUsedContext');

  var doLogout = function doLogout() {
    setCurrentUser(JSON.stringify(C$1.anonUser));
  };

  if (currentUser !== null && currentUser !== void 0 && currentUser.email) {
    return /*#__PURE__*/React.createElement(FlexRow, null, "[", currentUser.email, " ", /*#__PURE__*/React.createElement(Btn, {
      onClick: doLogout
    }, "Logout"), " ]");
  }

  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(FlexCol, null, /*#__PURE__*/React.createElement(FacebookLogin, null), /*#__PURE__*/React.createElement(RegisterWithEmailBtn, {
    onClick: function onClick() {
      setRegisterModalOpen(true);
    }
  }), /*#__PURE__*/React.createElement(LoginWithEmailBtn, {
    onClick: function onClick() {
      setLoginModalOpen(true);
    }
  })), /*#__PURE__*/React.createElement(RegisterModal, null), /*#__PURE__*/React.createElement(LoginModal, null));
};

AuthWidget.propTypes = {};

var LoginModal = function LoginModal(props) {
  var _useContext = useContext(AuthContext),
      setCurrentUser = _useContext.setCurrentUser,
      loginModalOpen = _useContext.loginModalOpen,
      setLoginModalOpen = _useContext.setLoginModalOpen,
      useApi = _useContext.useApi;

  var _useState = useState(''),
      email = _useState[0],
      setEmail = _useState[1];

  var _useState2 = useState(''),
      password = _useState2[0],
      setPassword = _useState2[1];

  var api = useApi();

  var doPasswordLogin = function doPasswordLogin(email, password) {
    try {
      api.postLogin({
        email: email,
        password: password
      }).then(function (r) {
        setLoginModalOpen(false);
        toast$1('Login Successful.');
      })["catch"](function (err) {
        logg(e, 'e323');
        toast$1("Login failed");
        setCurrentUser(C$1.anonUser);
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return /*#__PURE__*/React.createElement(Modal, {
    isOpen: loginModalOpen
  }, /*#__PURE__*/React.createElement("div", {
    onClick: function onClick() {
      return setLoginModalOpen(false);
    }
  }, "[x]"), /*#__PURE__*/React.createElement(FlexCol, null, /*#__PURE__*/React.createElement("input", {
    type: "email",
    value: email,
    onChange: function onChange(e) {
      return setEmail(e.target.value);
    }
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
    type: "password",
    value: password,
    onChange: function onChange(e) {
      return setPassword(e.target.value);
    },
    onKeyDown: function onKeyDown(e) {
      if (e.key === 'Enter') {
        doPasswordLogin(email, password);
      }
    }
  }), /*#__PURE__*/React.createElement(Btn, {
    onClick: function onClick() {
      return doPasswordLogin(email, password);
    }
  }, "Password Login")));
};

var RegisterModal = function RegisterModal(props) {
  var _useContext = useContext(AuthContext),
      setCurrentUser = _useContext.setCurrentUser,
      registerModalOpen = _useContext.registerModalOpen,
      setRegisterModalOpen = _useContext.setRegisterModalOpen,
      useApi = _useContext.useApi;

  var api = useApi();

  var _useState = useState(''),
      email = _useState[0],
      setEmail = _useState[1];

  var _useState2 = useState(''),
      password = _useState2[0],
      setPassword = _useState2[1];

  var _useState3 = useState(''),
      password2 = _useState3[0],
      setPassword2 = _useState3[1];

  var doRegister = function doRegister(email, password, password2) {
    try {
      if (password !== password2) {
        return Promise.resolve(toast('Passwords do not match'));
      }

      api.doRegister({
        email: email,
        password: password
      }).then(function (r) {
        logg(r, 'registered');
        localStorage.setItem(C.jwt_token, r.jwt_token);
        localStorage.setItem(C.current_user, JSON.stringify(r));
        setCurrentUser(r);
        setRegisterModalOpen(false);
      })["catch"](function (e) {
        logg(e, 'e322');
        toast("Registration failed");
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return /*#__PURE__*/React.createElement(Modal, {
    style: {
      zIndex: 3
    },
    isOpen: registerModalOpen
  }, /*#__PURE__*/React.createElement("div", {
    onClick: function onClick() {
      return setRegisterModalOpen(false);
    }
  }, "[x]"), /*#__PURE__*/React.createElement(FlexCol, null, /*#__PURE__*/React.createElement("label", {
    "for": "email"
  }, "Email"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    name: "email",
    value: email,
    onChange: function onChange(e) {
      return setEmail(e.target.value);
    }
  }), /*#__PURE__*/React.createElement("label", {
    "for": "password"
  }, "Password"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    name: "password",
    value: password,
    onChange: function onChange(e) {
      return setPassword(e.target.value);
    }
  }), /*#__PURE__*/React.createElement("label", {
    "for": "password2"
  }, "Confirm Password"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    name: "password2",
    value: password2,
    onChange: function onChange(e) {
      return setPassword2(e.target.value);
    }
  }), /*#__PURE__*/React.createElement(FlexRow, null, /*#__PURE__*/React.createElement(Btn, {
    onClick: function onClick() {
      return doRegister(email, password, password2);
    }
  }, "Register"), /*#__PURE__*/React.createElement(Btn, {
    onClick: function onClick() {
      return setRegisterModalOpen(false);
    }
  }, "Cancel"))));
};

var _excluded = ["children"];
var AuthContext = createContext({});

var AuthContextProvider = function AuthContextProvider(_ref) {
  var children = _ref.children,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  var currentUser = props.currentUser,
      setCurrentUser = props.setCurrentUser;
  var defaultUser = localStorage.getItem(C$1.current_user);
  logg(defaultUser, 'defaultUser');
  defaultUser = defaultUser ? JSON.parse(defaultUser) : C$1.anonUser;
  logg(defaultUser, 'defaultUser');

  var _useState = useState(defaultUser),
      localCurrentUser = _useState[0],
      _setCurrentUser = _useState[1];

  var setLocalCurrentUser = function setLocalCurrentUser(user) {
    localStorage.setItem(C$1.jwt_token, user.jwt_token);
    localStorage.setItem(C$1.current_user, JSON.stringify(user));

    _setCurrentUser(user);
  };

  if (!currentUser) {
    currentUser = localCurrentUser;
    setCurrentUser = setLocalCurrentUser;
  }

  logg(currentUser, 'currentUser III');

  var _useState2 = useState(false),
      loginModalOpen = _useState2[0],
      setLoginModalOpen = _useState2[1];

  var _useState3 = useState(false),
      registerModalOpen = _useState3[0],
      setRegisterModalOpen = _useState3[1];

  var moreProps = {
    currentUser: currentUser,
    setCurrentUser: setCurrentUser,
    loginModalOpen: loginModalOpen,
    setLoginModalOpen: setLoginModalOpen,
    registerModalOpen: registerModalOpen,
    setRegisterModalOpen: setRegisterModalOpen
  };
  return /*#__PURE__*/React.createElement(AuthContext.Provider, {
    value: _extends({}, props, moreProps)
  }, children);
};
var _FacebookLogin = Plugins.FacebookLogin;
var FACEBOOK_PERMISSIONS = ['email'];
var FacebookLogin = function FacebookLogin(props) {
  var _useContext = useContext(AuthContext),
      setCurrentUser = _useContext.setCurrentUser,
      useApi = _useContext.useApi;

  var api = useApi();

  var doFbLogin = function doFbLogin() {
    try {
      return Promise.resolve(_FacebookLogin.login({
        permissions: FACEBOOK_PERMISSIONS
      })).then(function (result) {
        if (result.accessToken) {
          request.post("" + config.apiOrigin + api.longTermTokenPath, {
            accessToken: result.accessToken.token
          }).then(function (resp) {
            localStorage.setItem(C$1.jwt_token, resp.data.jwt_token);
            localStorage.setItem(C$1.current_user, JSON.stringify(resp.data));
            setCurrentUser(resp.data);
          })["catch"](function (err) {
            logg(err, "Could not post request to " + config.apiOrigin + api.longTermTokenPath);
          });
        } else {
          logg('canceled');
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return /*#__PURE__*/React.createElement(Btn, {
    onClick: doFbLogin
  }, "Login or Register with Facebook");
};

axios.create({});

var S = {
  borderWidth: '10px',
  bottomDrawerClosedHeight: '20px',
  bottomDrawerOpenHeight: '115px',
  breadcrumbsHeight: '30px',
  thinBorderWidth: '2px',
  thinBorderRadius: '5px'
};

var lightTheme = _extends({}, S, {
  thinBorder: '2px solid black',
  colors: {
    text: 'black',
    background: '#dedede',
    blue: '#6aa3e9',
    darkGrey: '#605d5d',
    lightGrey: '#988b8b',
    red: 'red',
    border: 'black',
    cardBackground: 'white'
  }
});

var darkTheme = _extends({}, S, {
  thinBorder: '2px solid white',
  colors: {
    text: 'white',
    background: '#292929',
    blue: '#73b0fa',
    darkGrey: '#b3afaf',
    lightGrey: '#4a4343',
    red: '#eb83a8',
    border: 'white',
    cardBackground: '#1a1a1a'
  }
});

var _excluded$1 = ["children"];

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12;
var BackIcon = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n  margin-right: 5px;\n  cursor: pointer;\n"])));
var Btn = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["\n  border: 1px solid gray;\n  border-radius: 5px;\n  cursor: pointer;\n  display: inline-block;\n  padding: .3em 1em;\n"])));
var ChevronLeft = styled(ChevronLeft$1)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteralLoose(["\n  color: ", "\n"])), function (p) {
  return p.theme.colors.text;
});
var ChevronRight = styled(ChevronRight$1)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteralLoose(["\n  color: ", "\n"])), function (p) {
  return p.theme.colors.text;
});
var Card = styled(_Box)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteralLoose(["\n  margin-bottom: 1em;\n  padding: 1em;\n  background: white;\n  cursor: ", ";\n\n  display: flex;\n  flex-direction: column;\n"])), function (p) {
  return p.cursor ? p.cursor : 'auto';
});

var _FlexCol = styled.div(_templateObject6 || (_templateObject6 = _taggedTemplateLiteralLoose(["\n  display: flex;\n  flex-direction: column;\n\n  > * {\n    margin: auto .4em;\n  }\n"])));

var FlexCol = function FlexCol(_ref) {
  var children = _ref.children,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$1);

  return /*#__PURE__*/React.createElement(_FlexCol, _extends({
    className: "FlexCol"
  }, props), children);
};
var FlexRow = styled.div(_templateObject7 || (_templateObject7 = _taggedTemplateLiteralLoose(["\n  display: flex;\n\n  > * {\n    margin: auto .4em;\n  }\n"])));

var _Circle = styled.div(_templateObject8 || (_templateObject8 = _taggedTemplateLiteralLoose(["\n  position: fixed;\n  z-index: 999;\n  overflow: show;\n  margin: auto;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  width: 50px;\n  height: 50px;\n"])));

var logg = function logg(a, b, c) {
  if (b === void 0) {
    b = "";
  }

  if (c === void 0) {
    c = null;
  }

  c = "string" === typeof c ? c : b.replace(/\W/g, "");

  if (c.length > 0) {
    window[c] = a;
  }

  console.log("+++ " + b + ":", a);
};
var MenuIcon = styled(Menu)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteralLoose(["\n  color: ", "\n"])), function (p) {
  return p.theme.colors.text;
});
var TwofoldContext = React.createContext({});
var WBordered = styled.div(_templateObject10 || (_templateObject10 = _taggedTemplateLiteralLoose(["\n  border: ", ";\n  border-radius: ", ";\n  background: ", ";\n  padding: .5em;\n\n  margin-bottom: 1em;\n"])), function (p) {
  return p.theme.thinBorder;
}, function (p) {
  return p.theme.thinBorderRadius;
}, function (p) {
  return p.theme.colors.cardBackground;
});
var WBorderedItem = styled.div(_templateObject11 || (_templateObject11 = _taggedTemplateLiteralLoose(["\n  border: ", ";\n  border-radius: ", ";\n  background: ", ";\n  color: ", ";\n\n  margin: 0 .5em .5em 0;\n  padding: .5em;\n\n  text-align: center;\n\n  width: 18%;\n  max-width: 140px;\n  min-width: 120px;\n"])), function (p) {
  return p.theme.thinBorder;
}, function (p) {
  return p.theme.thinBorderRadius;
}, function (p) {
  return p.theme.colors.cardBackground;
}, function (p) {
  return p.theme.colors.text;
});
var Wrapper = styled.div(_templateObject12 || (_templateObject12 = _taggedTemplateLiteralLoose(["\n  height: 100vh;\n"])));
var ZoomContext = React.createContext({});

var _templateObject$1, _templateObject2$1, _templateObject3$1, _templateObject4$1;

var _excluded$2 = ["children"];
var JwtContext = React.createContext({});

var JwtContextProvider = function JwtContextProvider(_ref) {
  var children = _ref.children,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$2);

  logg(props, 'JwtContextProvider');
  var api = props.api;
  var maybeUser = JSON.parse(localStorage.getItem(C$1.current_user)) || C$1.anonUser;

  var _useState = useState(maybeUser),
      currentUser = _useState[0],
      setCurrentUser = _useState[1];

  var _useState2 = useState({}),
      loginModalOpen = _useState2[0],
      setLoginModalOpen = _useState2[1];

  useEffect(function () {
    api.getMyAccount().then(function (resp) {
      localStorage.setItem(C$1.current_user, JSON.stringify(resp));
      setCurrentUser(resp);
    })["catch"](function (e) {
      logg(e, 'e322');
      setCurrentUser(C$1.anonUser);
      localStorage.removeItem(C$1.current_user);
      localStorage.removeItem(C$1.jwt_token);
    });
  }, []);
  return /*#__PURE__*/React.createElement(JwtContext.Provider, {
    value: {
      api: api,
      currentUser: currentUser,
      setCurrentUser: setCurrentUser,
      loginModalOpen: loginModalOpen,
      setLoginModalOpen: setLoginModalOpen
    }
  }, children);
};

JwtContextProvider.props = {
  api: PropTypes.object
};
var FlexRow$1 = styled.div(_templateObject$1 || (_templateObject$1 = _taggedTemplateLiteralLoose(["\n  display: flex;\n\n  > * {\n    margin: auto .4em;\n  }\n"])));
var W1 = styled.div(_templateObject2$1 || (_templateObject2$1 = _taggedTemplateLiteralLoose(["\n  border: 1px solid red;\n"])));
var W2 = styled.div(_templateObject3$1 || (_templateObject3$1 = _taggedTemplateLiteralLoose(["\n  display: flex;\n"])));
var SimpleJwtRow = function SimpleJwtRow() {
  var _useContext = useContext(JwtContext),
      currentUser = _useContext.currentUser;

  logg(useContext(JwtContext), 'SimpleJwtRowUsedJwtContext');
  return /*#__PURE__*/React.createElement(W1, null, /*#__PURE__*/React.createElement(FlexRow$1, null, currentUser.email && /*#__PURE__*/React.createElement(W2, null, /*#__PURE__*/React.createElement("i", null, currentUser.email), /*#__PURE__*/React.createElement(Logout, null)), !currentUser.email && /*#__PURE__*/React.createElement(LoginWithPassword, null)));
};

var _W = styled.div(_templateObject4$1 || (_templateObject4$1 = _taggedTemplateLiteralLoose(["\n  display: flex;\n\n  > * {\n    // margin: auto .4em;\n  }\n"])));

var LoginWithPassword = function LoginWithPassword(props) {
  var _useContext2 = useContext(JwtContext),
      api = _useContext2.api,
      setCurrentUser = _useContext2.setCurrentUser,
      setLoginModalOpen = _useContext2.setLoginModalOpen;

  var _useState3 = useState(''),
      email = _useState3[0],
      setEmail = _useState3[1];

  var _useState4 = useState(''),
      password = _useState4[0],
      setPassword = _useState4[1];

  var doPasswordLogin = function doPasswordLogin(email, password) {
    try {
      api.postLoginWithPassword({
        email: email,
        password: password
      }).then(function (resp) {
        logg(resp, 'ze resp');
        localStorage.setItem(C$1.jwt_token, resp.jwt_token);
        localStorage.setItem(C$1.current_user, JSON.stringify(resp));
        setCurrentUser(resp);
        setLoginModalOpen(false);
      })["catch"](function (e) {
        logg(e, 'e322');
        toast("Login failed");
        setCurrentUser(C$1.anonUser);
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return /*#__PURE__*/React.createElement(_W, null, /*#__PURE__*/React.createElement("input", {
    type: "email",
    value: email,
    onChange: function onChange(e) {
      return setEmail(e.target.value);
    }
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
    type: "password",
    value: password,
    onChange: function onChange(e) {
      return setPassword(e.target.value);
    },
    onKeyDown: function onKeyDown(e) {
      if (e.key === 'Enter') {
        doPasswordLogin(email, password);
      }
    }
  }), /*#__PURE__*/React.createElement(Btn, {
    onClick: function onClick() {
      return doPasswordLogin(email, password);
    }
  }, "Login"));
};
var Logout = function Logout() {
  var _useContext3 = useContext(JwtContext),
      setCurrentUser = _useContext3.setCurrentUser;

  var doLogout = function doLogout() {
    localStorage.removeItem(C$1.jwt_token);
    localStorage.removeItem(C$1.current_user);
    setCurrentUser({});
  };

  return /*#__PURE__*/React.createElement(Btn, {
    onClick: doLogout
  }, "Logout");
};

var JwtContext$1 = {
  __proto__: null,
  JwtContext: JwtContext,
  JwtContextProvider: JwtContextProvider,
  SimpleJwtRow: SimpleJwtRow,
  LoginWithPassword: LoginWithPassword,
  Logout: Logout
};

var _templateObject$2;

var _W$1 = styled.div(_templateObject$2 || (_templateObject$2 = _taggedTemplateLiteralLoose(["\n  display: flex;\n\n  > * {\n    // margin: auto .4em;\n  }\n"])));

var PasswordLogin = function PasswordLogin(props) {
  var _useContext = useContext(SimpleContext),
      setCurrentUser = _useContext.setCurrentUser,
      setLoginModalOpen = _useContext.setLoginModalOpen,
      useApi = _useContext.useApi;

  var _useState = useState(''),
      email = _useState[0],
      setEmail = _useState[1];

  var _useState2 = useState(''),
      password = _useState2[0],
      setPassword = _useState2[1];

  var api = useApi();

  var doPasswordLogin = function doPasswordLogin(email, password) {
    try {
      api.postLogin({
        email: email,
        password: password
      }).then(function (resp) {
        setLoginModalOpen(false);
      })["catch"](function (e) {
        logg(e, 'e322');
        toast$1("Login failed");
        setCurrentUser(C$1.anonUser);
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return /*#__PURE__*/React.createElement(_W$1, null, /*#__PURE__*/React.createElement("input", {
    type: "email",
    value: email,
    onChange: function onChange(e) {
      return setEmail(e.target.value);
    }
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
    type: "password",
    value: password,
    onChange: function onChange(e) {
      return setPassword(e.target.value);
    },
    onKeyDown: function onKeyDown(e) {
      if (e.key === 'Enter') {
        doPasswordLogin(email, password);
      }
    }
  }), /*#__PURE__*/React.createElement(Btn, {
    onClick: function onClick() {
      return doPasswordLogin(email, password);
    }
  }, "Password Login"));
};

PasswordLogin.propTypes = {};

var _templateObject$3, _templateObject2$2;
var W0 = styled.div(_templateObject$3 || (_templateObject$3 = _taggedTemplateLiteralLoose(["\n"])));
var Actions = styled.div(_templateObject2$2 || (_templateObject2$2 = _taggedTemplateLiteralLoose(["\n  display: flex;\n  flex-direction: row-reverse;\n"])));

var Scratchpad = function Scratchpad(props) {
  var _useContext = useContext(AuthContext),
      useApi = _useContext.useApi;

  var api = useApi();

  var _useState = useState(localStorage.getItem(C$1.names.scratchpad) || ''),
      txt = _useState[0],
      setTxt = _useState[1];

  var doSave = function doSave() {
    localStorage.setItem(C$1.names.scratchpad, txt);
    api.postProfile({
      scratchpad: txt
    }).then(function (data) {})["catch"](function (err) {
      logg('Cannot update profile:', err);
    });
  };

  return /*#__PURE__*/React.createElement(W0, null, /*#__PURE__*/React.createElement("textarea", {
    name: "scratchpad",
    rows: "20",
    cols: "40",
    onChange: function onChange(e) {
      return setTxt(e.target.value);
    },
    value: txt
  }), /*#__PURE__*/React.createElement(Actions, null, /*#__PURE__*/React.createElement(Btn, {
    onClick: doSave
  }, "Save")));
};

Scratchpad.propTypes = {};

export { AuthContext, AuthContextProvider, AuthWidget, PasswordLogin, Scratchpad, JwtContext$1 as jwtManager, logg };
//# sourceMappingURL=index.modern.js.map
