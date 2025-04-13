import React from "react";
import { Redirect } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ResetPasswordPage from "../pages/Authentication/ResetPassword";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import AuthLockScreen from "../pages/Authentication/AuthLockScreen";

// Dashboard
import Dashboard from "../pages/Dashboard/index";


import TAndroid  from "../pages/Topics/Android";
import TApple  from "../pages/Topics/Apple";
import TCooling  from "../pages/Topics/Cooling";
import TCpu  from "../pages/Topics/Cpu";
import TDesktopReview  from "../pages/Topics/DesktopReview";
import TGpus  from "../pages/Topics/Gpus";
import THtc  from "../pages/Topics/Htc";
import THuawei  from "../pages/Topics/Huawei";
import TMacReview  from "../pages/Topics/MacReview";
import TMemory  from "../pages/Topics/Memory";
import TMicrosoft  from "../pages/Topics/Microsoft";
import TMotheboard  from "../pages/Topics/Motheboard";
import TNas  from "../pages/Topics/Nas";
import TNotebookReview  from "../pages/Topics/NotebookReview";
import TSamsung  from "../pages/Topics/Samsung";
import TSmartphones  from "../pages/Topics/Smartphones";
import TSsd  from "../pages/Topics/Ssd";
import TStorage  from "../pages/Topics/Storage";
import TTablets  from "../pages/Topics/Tablets";
import TUltrabookReview  from "../pages/Topics/UltrabookReview";

const authProtectedRoutes = [	
	//Topic
	{ path: "/topic/android", component: TAndroid },
	{ path: "/topic/apple", component: TApple },
	{ path: "/topic/cooling", component: TCooling },
	{ path: "/topic/cpu", component: TCpu },
	{ path: "/topic/desktop-review", component: TDesktopReview },
	{ path: "/topic/gpus", component: TGpus },
	{ path: "/topic/htc", component: THtc },
	{ path: "/topic/huawei", component: THuawei },
	{ path: "/topic/mac-review", component: TMacReview },
	{ path: "/topic/memory", component: TMemory },
	{ path: "/topic/microsoft", component: TMicrosoft },
	{ path: "/topic/motheboard", component: TMotheboard },
	{ path: "/topic/nas", component: TNas },
	{ path: "/topic/notebook review", component: TNotebookReview },
	{ path: "/topic/samsung", component: TSamsung },
	{ path: "/topic/smartphones", component: TSmartphones },
	{ path: "/topic/ssd", component: TSsd },
	{ path: "/topic/storage", component: TStorage },
	{ path: "/topic/tablets", component: TTablets },
	{ path: "/topic/ultrabook-review", component: TUltrabookReview },

	{ path: "/dashboard", component: Dashboard },

	// this route should be at the end of all other routes
	{ path: "/", exact: true, component: () => <Redirect to="/dashboard" /> }
];

const publicRoutes = [
	{ path: "/logout", component: Logout },
	{ path: "/login", component: Login },
	{ path: "/forgot-password", component: ForgetPwd },
	{ path: "/reset-password", component: ResetPasswordPage },
	{ path: "/register", component: Register },
	{ path: "/lock-screen", component: AuthLockScreen },
];

export { authProtectedRoutes, publicRoutes };
