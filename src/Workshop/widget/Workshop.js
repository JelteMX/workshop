define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dijit/_TemplatedMixin",

    "mxui/dom",
    "dojo/dom",
    "dojo/dom-prop",
    "dojo/dom-geometry",
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/dom-construct",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/text",
    "dojo/html",
    "dojo/_base/event",

    "Workshop/lib/jquery-1.11.2",
    "dojo/text!Workshop/widget/template/Workshop.html"
], function (declare, _WidgetBase, _TemplatedMixin, dom, dojoDom, dojoProp, dojoGeometry, dojoClass, dojoStyle, dojoConstruct, dojoArray, lang, dojoText, dojoHtml, dojoEvent, _jQuery, widgetTemplate) {
    "use strict";

    var $ = _jQuery.noConflict(true);

    return declare("Workshop.widget.Workshop", [ _WidgetBase, _TemplatedMixin ], {

        templateString: widgetTemplate,

        _contextObj: null,

        constructor: function () {
            logger.debug(this.id + ".constructor");
        },

        postCreate: function () {
            logger.debug(this.id + ".postCreate");
            this._setupEvents();
        },

        update: function (obj, callback) {
            logger.debug(this.id + ".update");

            this._contextObj = obj;
            this._updateRendering(callback); // We're passing the callback to updateRendering to be called after DOM-manipulation
        },

        _updateRendering: function (callback) {
            logger.debug(this.id + "._updateRendering");

            if (this._contextObj !== null) {
                dojoStyle.set(this.domNode, "display", "block");

            } else {
                dojoStyle.set(this.domNode, "display", "none");
            }

            mendix.lang.nullExec(callback);
        },

        resize: function (box) {
          logger.debug(this.id + ".resize");
        },

        uninitialize: function () {
          logger.debug(this.id + ".uninitialize");
            // Clean up listeners, helper objects, etc. There is no need to remove listeners added with this.connect / this.subscribe / this.own.
        },

        _setupEvents: function () {
            logger.debug(this.id + "._setupEvents");

            // this.connect(this.infoTextNode, "click", function (e) {
            //     // Only on mobile stop event bubbling!
            //     this._stopBubblingEventOnMobile(e);
            //
            //     // If a microflow has been set execute the microflow on a click.
            //     if (this.mfToExecute !== "") {
            //         mx.data.action({
            //             params: {
            //                 applyto: "selection",
            //                 actionname: this.mfToExecute,
            //                 guids: [ this._contextObj.getGuid() ]
            //             },
            //             store: {
            //                 caller: this.mxform
            //             },
            //             callback: function (obj) {
            //                 //TODO what to do when all is ok!
            //             },
            //             error: lang.hitch(this, function (error) {
            //                 logger.error(this.id + ": An error occurred while executing microflow: " + error.description);
            //             })
            //         }, this);
            //     }
            // });
        },

        _execMf: function (mf, guid, cb) {
            logger.debug(this.id + "._execMf");
            if (mf && guid) {
                mx.data.action({
                    params: {
                        applyto: "selection",
                        actionname: mf,
                        guids: [guid]
                    },
                    store: {
                        caller: this.mxform
                    },
                    callback: lang.hitch(this, function (objs) {
                        if (cb && typeof cb === "function") {
                            cb(objs);
                        }
                    }),
                    error: function (error) {
                        console.debug(error.description);
                    }
                }, this);
            }
        }


    });
});

require(["Workshop/widget/Workshop"]);
