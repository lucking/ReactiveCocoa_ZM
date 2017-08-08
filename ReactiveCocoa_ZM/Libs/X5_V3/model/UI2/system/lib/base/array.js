/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var supportsSplice = function() {
		var array = [], lengthBefore, j = 20;

		if (!array.splice) {
			return false;
		}

		// This detects a bug in IE8 splice method:
		// see
		// http://social.msdn.microsoft.com/Forums/en-US/iewebdevelopment/thread/6e946d03-e09f-4b22-a4dd-cd5e276bf05a/

		while (j--) {
			array.push("A");
		}

		array.splice(15, 0, "F", "F", "F", "F", "F", "F", "F", "F", "F", "F",
				"F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F");

		lengthBefore = array.length; // 41
		array.splice(13, 0, "XXX"); // add one element

		if (lengthBefore + 1 != array.length) {
			return false;
		}
		// end IE8 bug

		return true;
	}();

    function fixArrayIndex (array, index) {
        return (index < 0) ? Math.max(0, array.length + index)
                           : Math.min(array.length, index);
    }

    function replaceSim (array, index, removeCount, insert) {
        var add = insert ? insert.length : 0,
            length = array.length,
            pos = fixArrayIndex(array, index);

        // we try to use Array.push when we can for efficiency...
        if (pos === length) {
            if (add) {
                array.push.apply(array, insert);
            }
        } else {
            var remove = Math.min(removeCount, length - pos),
                tailOldPos = pos + remove,
                tailNewPos = tailOldPos + add - remove,
                tailCount = length - tailOldPos,
                lengthAfterRemove = length - remove,
                i;

            if (tailNewPos < tailOldPos) { // case A
                for (i = 0; i < tailCount; ++i) {
                    array[tailNewPos+i] = array[tailOldPos+i];
                }
            } else if (tailNewPos > tailOldPos) { // case B
                for (i = tailCount; i--; ) {
                    array[tailNewPos+i] = array[tailOldPos+i];
                }
            } // else, add == remove (nothing to do)

            if (add && pos === lengthAfterRemove) {
                array.length = lengthAfterRemove; // truncate array
                array.push.apply(array, insert);
            } else {
                array.length = lengthAfterRemove + add; // reserves space
                for (i = 0; i < add; ++i) {
                    array[pos+i] = insert[i];
                }
            }
        }

        return array;
    }
    
	function eraseSim(array, index, removeCount) {
		return replaceSim(array, index, removeCount);
	}

	function eraseNative(array, index, removeCount) {
		array.splice(index, removeCount);
		return array;
	}
	var methods = {
		erase : supportsSplice ? eraseNative : eraseSim,
		each: function (array, action) {
            for (var i = 0, j = array.length; i < j; i++)
                action(array[i]);
        },
        indexOf: function (array, item) {
            if (typeof Array.prototype.indexOf == "function")
                return Array.prototype.indexOf.call(array, item);
            for (var i = 0, j = array.length; i < j; i++)
                if (array[i] === item)
                    return i;
            return -1;
        },
        first: function (array, predicate, predicateOwner) {
            for (var i = 0, j = array.length; i < j; i++)
                if (predicate.call(predicateOwner, array[i]))
                    return array[i];
            return null;
        },
        remove: function (array, itemToRemove) {
            var index = methods.indexOf(array, itemToRemove);
            if (index >= 0)
                array.splice(index, 1);
        },
        unique: function (array) {
            array = array || [];
            var result = [];
            for (var i = 0, j = array.length; i < j; i++) {
                if (methods.indexOf(result, array[i]) < 0)
                    result.push(array[i]);
            }
            return result;
        },
        map: function (array, mapping) {
            array = array || [];
            var result = [];
            for (var i = 0, j = array.length; i < j; i++)
                result.push(mapping(array[i]));
            return result;
        },
        filter: function (array, predicate) {
            array = array || [];
            var result = [];
            for (var i = 0, j = array.length; i < j; i++)
                if (predicate(array[i]))
                    result.push(array[i]);
            return result;
        },
        merge: function (array, valuesToPush) {
            if (valuesToPush instanceof Array)
                array.push.apply(array, valuesToPush);
            else
                for (var i = 0, j = valuesToPush.length; i < j; i++)
                    array.push(valuesToPush[i]);
            return array;
        }
				
	};
	return methods;
});