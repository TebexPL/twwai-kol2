'use strict';

import userManager from './user.manager';
import paramManager from './param.manager';


function getter(manager, request) {
  return function () {
    return manager.create(request, this);
  };
}

export default {
    getUserManager: getter(userManager),
    getParamManager: getter(paramManager),
};
