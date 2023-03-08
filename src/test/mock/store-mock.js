const { EAction } = require("../../components/ui/modals/type");

module.exports = {
    user: {
        name: "OK",
        best: {
            isExists: false,
            time: 0,
            level: 0
        },
        step: "game"
    },
    "ui": {
        modalState: {
            isActive: false,
            modalAction: EAction.INIT
        },
        countDownState: {
            isActive: false
        }
    },
    game: {
        isSaved: false,
        level: 1,
        timeSpend: 0,
        initTime: 600,
        timeLeft: 509,
        itemByPair: [
            {
                positionX: -52.6,
                positionY: 0,
                id: "2",
                isActive: false,
                ref: null
            },
            {
                positionX: -368.2,
                positionY: 0,
                id: "8",
                isActive: false,
                ref: null
            },
            {
                positionX: -420.8,
                positionY: 0,
                id: "9",
                isActive: false,
                ref: null
            },
            {
                positionX: -52.6,
                positionY: 0,
                id: "2",
                isActive: false,
                ref: null
            },
            {
                positionX: 0,
                positionY: 0,
                id: "1",
                isActive: false,
                ref: null
            },
            {
                positionX: -157.8,
                positionY: 0,
                id: "4",
                isActive: false,
                ref: null
            },
            {
                positionX: -105.2,
                positionY: 0,
                id: "3",
                isActive: false,
                ref: null
            },
            {
                positionX: -473.4,
                positionY: 0,
                id: "10",
                isActive: false,
                ref: null
            },
            {
                positionX: -315.6,
                positionY: 0,
                id: "7",
                isActive: false,
                ref: null
            },
            {
                positionX: -368.2,
                positionY: 0,
                id: "8",
                isActive: false,
                ref: null
            },
            {
                positionX: -315.6,
                positionY: 0,
                id: "7",
                isActive: false,
                ref: null
            },
            {
                positionX: -210.4,
                positionY: 0,
                id: "5",
                isActive: false,
                ref: null
            },
            {
                positionX: -263,
                positionY: 0,
                id: "6",
                isActive: false,
                ref: null
            },
            {
                positionX: -473.4,
                positionY: 0,
                id: "10",
                isActive: false,
                ref: null
            },
            {
                positionX: -420.8,
                positionY: 0,
                id: "9",
                isActive: false,
                ref: null
            },
            {
                positionX: -210.4,
                positionY: 0,
                id: "5",
                isActive: false,
                ref: null
            },
            {
                positionX: -263,
                positionY: 0,
                id: "6",
                isActive: false,
                ref: null
            },
            {
                positionX: -105.2,
                positionY: 0,
                id: "3",
                isActive: false,
                ref: null
            },
            {
                positionX: -157.8,
                positionY: 0,
                id: "4",
                isActive: false,
                ref: null
            },
            {
                positionX: 0,
                positionY: 0,
                id: "1",
                isActive: false,
                ref: null
            }
        ],
        isPlaying: false,
        isResumeActive: true
    }
}