var testData = {
	"shapeStyle" : {
		"deptActivity" : {
			"shape" : {
				"w" : 100,
				"y" : 157,
				"h" : 30,
				"x" : 76
			}
		},
		"managerActivity" : {
			"shape" : {
				"w" : 100,
				"y" : 280.5,
				"h" : 30,
				"x" : 206
			}
		},
		"orderReportActivity" : {
			"shape" : {
				"w" : 100,
				"y" : 100,
				"h" : 30,
				"x" : 76
			}
		},
		"end1" : {
			"shape" : {
				"w" : 40,
				"y" : 558,
				"h" : 40,
				"x" : 106
			}
		},
		"deptCondition" : {
			"shape" : {
				"w" : 100,
				"y" : 218,
				"h" : 35,
				"x" : 76
			}
		},
		"salesPersonActivity" : {
			"shape" : {
				"w" : 100,
				"y" : 428,
				"h" : 30,
				"x" : 76
			}
		},
		"managerCondition" : {
			"shape" : {
				"w" : 100,
				"y" : 325,
				"h" : 35,
				"x" : 206
			}
		},
		"start1" : {
			"shape" : {
				"w" : 40,
				"y" : 37,
				"h" : 40,
				"x" : 106
			}
		},
		"factAmtcondition" : {
			"shape" : {
				"w" : 100,
				"y" : 278,
				"h" : 35,
				"x" : 76
			}
		},
		"xor3" : {
			"shape" : {
				"w" : 40,
				"y" : 37,
				"h" : 40,
				"x" : 236
			}
		},
		"xor2" : {
			"shape" : {
				"w" : 40,
				"y" : 346,
				"h" : 40,
				"x" : 106
			}
		},
		"totalAmtCondition" : {
			"shape" : {
				"w" : 100,
				"y" : 371,
				"h" : 35,
				"x" : 745
			}
		},
		"leadActivity" : {
			"shape" : {
				"w" : 100,
				"y" : 452.5,
				"h" : 30,
				"x" : 606
			}
		},
		"managerActivity|managerCondition" : {
			"outPortDir" : "s",
			"inPortDir" : "n",
			"targetNode" : "managerCondition",
			"sourceNode" : "managerActivity",
			"points" : [ {
				"y" : 305.5,
				"x" : 255
			}, {
				"y" : 324,
				"x" : 255
			} ]
		},
		"start1|orderReportActivity" : {
			"outPortDir" : "s",
			"inPortDir" : "n",
			"targetNode" : "orderReportActivity",
			"sourceNode" : "start1",
			"points" : [ {
				"y" : 76,
				"x" : 125
			}, {
				"y" : 99,
				"x" : 125
			} ]
		},
		"factAmtcondition|managerActivity" : {
			"outPortDir" : "e",
			"inPortDir" : "w",
			"targetNode" : "managerActivity",
			"sourceNode" : "factAmtcondition",
			"points" : [ {
				"y" : 294.5,
				"x" : 171
			}, {
				"y" : 294.5,
				"x" : 205
			} ]
		},
		"totalAmtCondition|xor2" : {
			"outPortDir" : "w",
			"inPortDir" : "e",
			"targetNode" : "xor2",
			"sourceNode" : "totalAmtCondition",
			"points" : [ {
				"y" : 387.5,
				"x" : 744
			}, {
				"cusMove" : true,
				"y" : 386.5,
				"x" : 182
			}, {
				"cusMove" : true,
				"y" : 366,
				"x" : 182
			}, {
				"y" : 365,
				"x" : 141
			} ]
		},
		"orderReportActivity|deptActivity" : {
			"outPortDir" : "s",
			"inPortDir" : "n",
			"targetNode" : "deptActivity",
			"sourceNode" : "orderReportActivity",
			"points" : [ {
				"y" : 126,
				"x" : 126
			}, {
				"y" : 157,
				"x" : 126
			} ]
		},
		"managerCondition|xor3" : {
			"outPortDir" : "e",
			"inPortDir" : "e",
			"targetNode" : "xor3",
			"sourceNode" : "managerCondition",
			"points" : [ {
				"y" : 341.5,
				"x" : 301
			}, {
				"cusMove" : true,
				"y" : 340.5,
				"x" : 568
			}, {
				"cusMove" : true,
				"y" : 57,
				"x" : 568
			}, {
				"y" : 56,
				"x" : 271
			} ]
		},
		"deptActivity|deptCondition" : {
			"outPortDir" : "s",
			"inPortDir" : "n",
			"targetNode" : "deptCondition",
			"sourceNode" : "deptActivity",
			"points" : [ {
				"y" : 183,
				"x" : 126
			}, {
				"y" : 218,
				"x" : 126
			} ]
		},
		"leadActivity|xor2" : {
			"outPortDir" : "w",
			"inPortDir" : "e",
			"targetNode" : "xor2",
			"sourceNode" : "leadActivity",
			"points" : [ {
				"y" : 466.5,
				"x" : 605
			}, {
				"y" : 465.5,
				"x" : 182
			}, {
				"cusMove" : true,
				"y" : 366,
				"x" : 182
			}, {
				"y" : 365,
				"x" : 141
			} ]
		},
		"xor2|salesPersonActivity" : {
			"outPortDir" : "s",
			"inPortDir" : "n",
			"targetNode" : "salesPersonActivity",
			"sourceNode" : "xor2",
			"points" : [ {
				"y" : 382,
				"x" : 126
			}, {
				"y" : 428,
				"x" : 126
			} ]
		},
		"salesPersonActivity|end1" : {
			"outPortDir" : "s",
			"inPortDir" : "n",
			"targetNode" : "end1",
			"sourceNode" : "salesPersonActivity",
			"points" : [ {
				"x" : 125,
				"y" : 453
			}, {
				"y" : 557,
				"x" : 125
			} ]
		},
		"xor3|orderReportActivity" : {
			"outPortDir" : "w",
			"inPortDir" : "e",
			"targetNode" : "orderReportActivity",
			"sourceNode" : "xor3",
			"points" : [ {
				"y" : 56,
				"x" : 235
			}, {
				"y" : 56,
				"x" : 203
			}, {
				"y" : 114,
				"x" : 203
			}, {
				"y" : 114,
				"x" : 171
			} ]
		},
		"totalAmtCondition|leadActivity" : {
			"outPortDir" : "s",
			"inPortDir" : "n",
			"targetNode" : "leadActivity",
			"sourceNode" : "totalAmtCondition",
			"points" : [ {
				"x" : 794,
				"y" : 401
			}, {
				"x" : 794,
				"y" : 426.25
			}, {
				"x" : 655,
				"y" : 426.25
			}, {
				"y" : 451.5,
				"x" : 655
			} ]
		},
		"deptCondition|factAmtcondition" : {
			"outPortDir" : "s",
			"inPortDir" : "n",
			"targetNode" : "factAmtcondition",
			"sourceNode" : "deptCondition",
			"points" : [ {
				"y" : 249,
				"x" : 126
			}, {
				"y" : 278,
				"x" : 126
			} ]
		},
		"deptCondition|xor3" : {
			"outPortDir" : "e",
			"inPortDir" : "s",
			"targetNode" : "xor3",
			"sourceNode" : "deptCondition",
			"points" : [ {
				"y" : 234.5,
				"x" : 171
			}, {
				"y" : 234.5,
				"x" : 255
			}, {
				"y" : 72,
				"x" : 255
			} ]
		},
		"managerCondition|totalAmtCondition" : {
			"outPortDir" : "s",
			"inPortDir" : "n",
			"targetNode" : "totalAmtCondition",
			"sourceNode" : "managerCondition",
			"points" : [ {
				"x" : 255,
				"y" : 355
			}, {
				"x" : 255,
				"y" : 362.5
			}, {
				"x" : 794,
				"y" : 362.5
			}, {
				"y" : 370,
				"x" : 794
			} ]
		},
		"factAmtcondition|xor2" : {
			"outPortDir" : "s",
			"inPortDir" : "n",
			"targetNode" : "xor2",
			"sourceNode" : "factAmtcondition",
			"points" : [ {
				"y" : 309,
				"x" : 126
			}, {
				"y" : 346,
				"x" : 126
			} ]
		}
	},
	"processFile" : "orderProcess.process.m"
};