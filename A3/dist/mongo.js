'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Set mongoose promise to use native ES6 Promise
_mongoose2.default.Promise = _promise2.default;

// db setup
_mongoose2.default.connect('mongodb://' + (process.env.DBUSER || 'wasong') + ':' + (process.env.DBPASS || 'wasong') + '@ds123259.mlab.com:23259/wasong');

var db = _mongoose2.default.connection;
var Schema = _mongoose2.default.Schema;

var userSchema = new Schema({
  name: {
    type: String
  },
  userId: {
    type: String
  },
  sessionId: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
  // history: {
  //   // list of courses user checked in
  // },
});

var sessionSchema = new Schema({
  id: {
    type: String,
    max: 120
  },
  active: Boolean,
  students: [Schema.Types.Mixed]
});

var UserModel = _mongoose2.default.model('user', userSchema);
var SessionModel = _mongoose2.default.model('session', sessionSchema);

var createUser = function createUser(_ref) {
  var name = _ref.name,
      date = _ref.date;

  var User = new UserModel({
    name: name,
    date: date
  });

  User.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Saved!');
    }
  });
};

var getSession = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(id) {
    var res;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            res = null;
            _context.prev = 1;
            _context.next = 4;
            return SessionModel.findOne({ id: id });

          case 4:
            res = _context.sent;
            return _context.abrupt('return', res);

          case 8:
            _context.prev = 8;
            _context.t0 = _context['catch'](1);

            console.log(_context.t0);
            return _context.abrupt('return', null);

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 8]]);
  }));

  return function getSession(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var updateSession = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(id, update) {
    var res;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            res = null;
            _context2.prev = 1;
            _context2.next = 4;
            return SessionModel.findOneAndUpdate({ id: id }, update, {
              new: true,
              upsert: true
            });

          case 4:
            res = _context2.sent;
            return _context2.abrupt('return', res);

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2['catch'](1);

            console.log(_context2.t0);
            return _context2.abrupt('return', null);

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[1, 8]]);
  }));

  return function updateSession(_x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}();

var startSession = function startSession(id) {
  return updateSession(id, { active: true });
};
var endSession = function endSession(id) {
  return updateSession(id, { active: false });
};

var checkIn = function () {
  var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(student) {
    var session;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return getSession(student.id);

          case 2:
            session = _context3.sent;

            if (!(session && session.active)) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt('return', updateSession(student.id, {
              students: [].concat((0, _toConsumableArray3.default)(session.students), [student])
            }));

          case 5:
            return _context3.abrupt('return', null);

          case 6:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function checkIn(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

var getHistory = function () {
  var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt('return', []);

          case 1:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function getHistory() {
    return _ref5.apply(this, arguments);
  };
}();

var actions = {
  createUser: createUser,
  getSession: getSession,
  startSession: startSession,
  endSession: endSession,
  checkIn: checkIn,
  getHistory: getHistory
};

exports.default = actions;
module.exports = exports['default'];