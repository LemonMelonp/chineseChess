const blueCar = "./img/blueCar.png";
const blueHorse = "./img/blueHorse.png";
const blueElephant = "./img/blueElephant.png";
const blueSoldier = "./img/blueSoldier.png";
const blueGeneral = "./img/blueGeneral.png";
const blueCannon = "./img/blueCannon.png";
const bluePawn = "./img/bluePawn.png";

const redCar = "./img/redCar.png";
const redHorse = "./img/redHorse.png";
const redElephant = "./img/redElephant.png";
const redSoldier = "./img/redSoldier.png";
const redGeneral = "./img/redGeneral.png";
const redCannon = "./img/redCannon.png";
const redPawn = "./img/redPawn.png";

const camp = {//阵营
    blue: 1,
    red: 2
};
const initData = {
    blueCar: {row: 1, col: 1, url: blueCar},
    blueHorse: {row: 1, col: 2, url: blueHorse},
    blueElephant: {row: 1, col: 3, url: blueElephant},
    blueSoldier: {row: 1, col: 4, url: blueSoldier},
    blueGeneral: {row: 1, col: 5, url: blueGeneral},
    blueSoldier2: {row: 1, col: 6, url: blueSoldier},
    blueElephant2: {row: 1, col: 7, url: blueElephant},
    blueHorse2: {row: 1, col: 8, url: blueHorse},
    blueCar2: {row: 1, col: 9, url: blueCar},
    blueCannon: {row: 3, col: 2, url: blueCannon},
    blueCannon2: {row: 3, col: 8, url: blueCannon},
    bluePawn: {row: 4, col: 1, url: bluePawn},
    bluePawn2: {row: 4, col: 3, url: bluePawn},
    bluePawn3: {row: 4, col: 5, url: bluePawn},
    bluePawn4: {row: 4, col: 7, url: bluePawn},
    bluePawn5: {row: 4, col: 9, url: bluePawn},

    redCar: {row: 10, col: 1, url: redCar},
    redHorse: {row: 10, col: 2, url: redHorse},
    redElephant: {row: 10, col: 3, url: redElephant},
    redSoldier: {row: 10, col: 4, url: redSoldier},
    redGeneral: {row: 10, col: 5, url: redGeneral},
    redSoldier2: {row: 10, col: 6, url: redSoldier},
    redElephant2: {row: 10, col: 7, url: redElephant},
    redHorse2: {row: 10, col: 8, url: redHorse},
    redCar2: {row: 10, col: 9, url: redCar},
    redCannon: {row: 8, col: 2, url: redCannon},
    redCannon2: {row: 8, col: 8, url: redCannon},
    redPawn: {row: 7, col: 1, url: redPawn},
    redPawn2: {row: 7, col: 3, url: redPawn},
    redPawn3: {row: 7, col: 5, url: redPawn},
    redPawn4: {row: 7, col: 7, url: redPawn},
    redPawn5: {row: 7, col: 9, url: redPawn}
};
let attackBoard = null;//当前棋子
let attack = camp.red;//当前进攻方（默认红方先进攻）


//车规则
let car = function (nowPoint, targetPoint) {
    if (targetPoint.row !== nowPoint.row && targetPoint.col !== nowPoint.col) return false;//车只能走直线
    if (targetPoint.row === nowPoint.row && targetPoint.col === nowPoint.col) return false;//车只能走直线
    if (targetPoint.row === nowPoint.row) {//横向走棋
        let tempCol = targetPoint.col > nowPoint.col ? targetPoint.col : nowPoint.col;//左右均可
        let startCol = targetPoint.col > nowPoint.col ? nowPoint.col : targetPoint.col;//左右均可
        for (let i = startCol+1; i < tempCol; i++) {
            //当前坐标与目标坐标之间有棋子挡住，不能走棋
            if (getBoard(nowPoint.row, i).getAttribute("dy-name") != null) return false;
        }
        return true;
    }
    if (targetPoint.col === nowPoint.col) {//纵向走棋
        let tempRow = targetPoint.row > nowPoint.row ? targetPoint.row : nowPoint.row;//上下均可
        let startRow = targetPoint.row > nowPoint.row ? nowPoint.row : targetPoint.row;//上下均可
        for (let i = startRow+1; i < tempRow; i++) {
            //当前坐标与目标坐标之间有棋子挡住，不能走棋
            if (getBoard(i, nowPoint.col).getAttribute("dy-name") != null) return false;
        }
        return true;
    }
    return false;
};
//马规则
let horse = function (nowPoint, targetPoint) {
    //总共八种正确落点
    if (targetPoint.row - nowPoint.row === 2 && targetPoint.col - nowPoint.col === 1) {
        return getBoard(nowPoint.row + 1, nowPoint.col).getAttribute("dy-name") == null;
    }
    if (targetPoint.row - nowPoint.row === 2 && targetPoint.col - nowPoint.col === -1) {
        return getBoard(nowPoint.row + 1, nowPoint.col).getAttribute("dy-name") == null;
    }
    if (targetPoint.row - nowPoint.row === -2 && targetPoint.col - nowPoint.col === 1) {
        return getBoard(nowPoint.row - 1, nowPoint.col).getAttribute("dy-name") == null;
    }
    if (targetPoint.row - nowPoint.row === -2 && targetPoint.col - nowPoint.col === -1) {
        return getBoard(nowPoint.row - 1, nowPoint.col).getAttribute("dy-name") == null;
    }
    if (targetPoint.row - nowPoint.row === 1 && targetPoint.col - nowPoint.col === 2) {
        return getBoard(nowPoint.row, nowPoint.col + 1).getAttribute("dy-name") == null;
    }
    if (targetPoint.row - nowPoint.row === -1 && targetPoint.col - nowPoint.col === 2) {
        return getBoard(nowPoint.row, nowPoint.col + 1).getAttribute("dy-name") == null;
    }
    if (targetPoint.row - nowPoint.row === 1 && targetPoint.col - nowPoint.col === -2) {
        return getBoard(nowPoint.row, nowPoint.col - 1).getAttribute("dy-name") == null;
    }
    if (targetPoint.row - nowPoint.row === -1 && targetPoint.col - nowPoint.col === -2) {
        return getBoard(nowPoint.row, nowPoint.col - 1).getAttribute("dy-name") == null;
    }
    return false;
};
//象规则
let elephant = function (board, nowPoint, targetPoint) {
    if (board.indexOf("blue") >= 0) {//蓝方象
        if (targetPoint.row <= 5) {
            if (targetPoint.row - nowPoint.row === 2 && targetPoint.col - nowPoint.col === 2){
                return getBoard(nowPoint.row + 1, nowPoint.col + 1).getAttribute("dy-name") == null;
            }
            if (targetPoint.row - nowPoint.row === 2 && targetPoint.col - nowPoint.col === -2){
                return getBoard(nowPoint.row + 1, nowPoint.col - 1).getAttribute("dy-name") == null;
            }
            if (targetPoint.row - nowPoint.row === -2 && targetPoint.col - nowPoint.col === -2){
                return getBoard(nowPoint.row - 1, nowPoint.col - 1).getAttribute("dy-name") == null;
            }
            if (targetPoint.row - nowPoint.row === -2 && targetPoint.col - nowPoint.col === 2){
                return getBoard(nowPoint.row - 1, nowPoint.col + 1).getAttribute("dy-name") == null;
            }
        }
        return false;
    } else {//红方象
        if (targetPoint.row >= 6) {
            if (targetPoint.row - nowPoint.row === 2 && targetPoint.col - nowPoint.col === 2){
                return getBoard(nowPoint.row + 1, nowPoint.col + 1).getAttribute("dy-name") == null;
            }
            if (targetPoint.row - nowPoint.row === 2 && targetPoint.col - nowPoint.col === -2){
                return getBoard(nowPoint.row + 1, nowPoint.col - 1).getAttribute("dy-name") == null;
            }
            if (targetPoint.row - nowPoint.row === -2 && targetPoint.col - nowPoint.col === -2){
                return getBoard(nowPoint.row - 1, nowPoint.col - 1).getAttribute("dy-name") == null;
            }
            if (targetPoint.row - nowPoint.row === -2 && targetPoint.col - nowPoint.col === 2){
                return getBoard(nowPoint.row - 1, nowPoint.col + 1).getAttribute("dy-name") == null;
            }
        }
        return false;
    }
};
//士规则
let soldier = function (board, nowPoint, targetPoint) {
    if (board.indexOf("blue") >= 0) {//蓝方士
        if (targetPoint.row <= 3 && targetPoint.col >= 4 && targetPoint.col <= 6) {
            if (targetPoint.row - nowPoint.row === 1 && targetPoint.col - nowPoint.col === 1) return true;
            if (targetPoint.row - nowPoint.row === 1 && targetPoint.col - nowPoint.col === -1) return true;
            if (targetPoint.row - nowPoint.row === -1 && targetPoint.col - nowPoint.col === -1) return true;
            if (targetPoint.row - nowPoint.row === -1 && targetPoint.col - nowPoint.col === 1) return true;
        }
        return false;
    } else {//红方士
        if (targetPoint.row >= 8 && targetPoint.col >= 4 && targetPoint.col <= 6) {
            if (targetPoint.row - nowPoint.row === 1 && targetPoint.col - nowPoint.col === 1) return true;
            if (targetPoint.row - nowPoint.row === 1 && targetPoint.col - nowPoint.col === -1) return true;
            if (targetPoint.row - nowPoint.row === -1 && targetPoint.col - nowPoint.col === -1) return true;
            if (targetPoint.row - nowPoint.row === -1 && targetPoint.col - nowPoint.col === 1) return true;
        }
        return false;
    }
};
//将/帅规则
let general = function (board, nowPoint, targetPoint) {
    if (board.indexOf("blue") >= 0) {//蓝方将
        if (targetPoint.row <= 3 && targetPoint.col >= 4 && targetPoint.col <= 6) {
            if (targetPoint.row === nowPoint.row && targetPoint.col - nowPoint.col === 1) return true;
            if (targetPoint.row === nowPoint.row && targetPoint.col - nowPoint.col === -1) return true;
            if (targetPoint.row - nowPoint.row === 1 && targetPoint.col === nowPoint.col) return true;
            if (targetPoint.row - nowPoint.row === -1 && targetPoint.col === nowPoint.col) return true;
        }
        return false;
    } else {//红方帅
        if (targetPoint.row >= 8 && targetPoint.col >= 4 && targetPoint.col <= 6) {
            if (targetPoint.row === nowPoint.row && targetPoint.col - nowPoint.col === 1) return true;
            if (targetPoint.row === nowPoint.row && targetPoint.col - nowPoint.col === -1) return true;
            if (targetPoint.row - nowPoint.row === 1 && targetPoint.col === nowPoint.col) return true;
            if (targetPoint.row - nowPoint.row === -1 && targetPoint.col === nowPoint.col) return true;
        }
        return false;
    }
};
//炮规则
let cannon = function (nowPoint, targetPoint) {
    if (nowPoint.row === targetPoint.row && nowPoint.col === targetPoint.col) return false;
    if (nowPoint.row !== targetPoint.row && nowPoint.col !== targetPoint.col) return false;
    if (nowPoint.row === targetPoint.row) {//行上移动
        let endCol = targetPoint.col > nowPoint.col ? targetPoint.col : nowPoint.col;//左右均可
        let startCol = targetPoint.col > nowPoint.col ? nowPoint.col : targetPoint.col;//左右均可
        if (getBoard(targetPoint.row, targetPoint.col).getAttribute("dy-name") == null) {//走棋
            for (let i = startCol+1; i < endCol; i++) {
                //当前坐标与目标坐标之间有棋子挡住，不能走棋
                if (getBoard(nowPoint.row, i).getAttribute("dy-name") != null) return false;
            }
            return true;
        } else {//吃棋
            let tempBoard = null;//记录临时棋子
            for (let i = startCol+1; i < endCol; i++) {
                //当前坐标与目标坐标之间有两个棋子挡住，不能吃棋
                if (getBoard(nowPoint.row, i).getAttribute("dy-name") != null) {
                    if (tempBoard != null) return false;
                    tempBoard = "第一个棋子";
                }
            }
            //当前坐标与目标坐标之间没有棋子挡住，也不能吃棋
            return tempBoard != null;
        }
    }
    if (nowPoint.col === targetPoint.col) {//列上移动
        let endRow = targetPoint.row - nowPoint.row > 0 ? targetPoint.row : nowPoint.row;//上下均可
        let startRow = targetPoint.row - nowPoint.row > 0 ? nowPoint.row : targetPoint.row;//上下均可
        if (getBoard(targetPoint.row, targetPoint.col).getAttribute("dy-name") == null) {//走棋
            for (let i = startRow+1; i < endRow; i++) {
                //当前坐标与目标坐标之间有棋子挡住，不能走棋
                if (getBoard(i, nowPoint.col).getAttribute("dy-name") != null) return false;
            }
            return true;
        } else {//吃棋
            let tempBoard = null;//记录临时棋子
            for (let i = startRow+1; i < endRow; i++) {
                //当前坐标与目标坐标之间有两个棋子挡住，不能吃棋
                if (getBoard(i, nowPoint.col).getAttribute("dy-name") != null) {
                    if (tempBoard != null) return false;
                    tempBoard = "第一个棋子";
                }
            }
            //当前坐标与目标坐标之间没有棋子挡住，也不能吃棋
            return tempBoard != null;
        }
    }
};
//卒/兵规则
let pawn = function (board, nowPoint, targetPoint) {
    if (board.indexOf("blue") >= 0) {//蓝方卒
        if (nowPoint.row > 5) {//过河了，可以左右前走，不能向后走
            if (targetPoint.row === nowPoint.row && targetPoint.col - nowPoint.col === 1) return true;
            if (targetPoint.row === nowPoint.row && targetPoint.col - nowPoint.col === -1) return true;
        }
        //卒还没过河，只能向前走
        return targetPoint.row - nowPoint.row === 1 && targetPoint.col === nowPoint.col;
    } else {//红方兵
        if (nowPoint.row <= 5) {//过河了，可以左右前走，不能向后走
            if (targetPoint.row === nowPoint.row && targetPoint.col - nowPoint.col === 1) return true;
            if (targetPoint.row === nowPoint.row && targetPoint.col - nowPoint.col === -1) return true;
        }
        //兵还没过河，只能向前走
        return targetPoint.row - nowPoint.row === -1 && targetPoint.col === nowPoint.col;
    }
};
function rules(board, nowPoint, targetPoint) {
    nowPoint.row = parseInt(nowPoint.row);
    nowPoint.col = parseInt(nowPoint.col);
    targetPoint.row = parseInt(targetPoint.row);
    targetPoint.col = parseInt(targetPoint.col);
    let boolean = false;
    switch (board) {
        case "blueCar": boolean = car(nowPoint, targetPoint);break;
        case "blueHorse": boolean = horse(nowPoint, targetPoint);break;
        case "blueElephant": boolean = elephant(board, nowPoint, targetPoint);break;
        case "blueSoldier": boolean = soldier(board, nowPoint, targetPoint);break;
        case "blueGeneral": boolean = general(board, nowPoint, targetPoint);break;
        case "blueSoldier2": boolean = soldier(board, nowPoint, targetPoint);break;
        case "blueElephant2": boolean = elephant(board, nowPoint, targetPoint);break;
        case "blueHorse2": boolean = horse(nowPoint, targetPoint);break;
        case "blueCar2": boolean = car(nowPoint, targetPoint);break;
        case "blueCannon": boolean = cannon(nowPoint, targetPoint);break;
        case "blueCannon2": boolean = cannon(nowPoint, targetPoint);break;
        case "bluePawn": boolean = pawn(board, nowPoint, targetPoint);break;
        case "bluePawn2": boolean = pawn(board, nowPoint, targetPoint);break;
        case "bluePawn3": boolean = pawn(board, nowPoint, targetPoint);break;
        case "bluePawn4": boolean = pawn(board, nowPoint, targetPoint);break;
        case "bluePawn5": boolean = pawn(board, nowPoint, targetPoint);break;

        case "redCar": boolean = car(nowPoint, targetPoint);break;
        case "redHorse": boolean = horse(nowPoint, targetPoint);break;
        case "redElephant": boolean = elephant(board, nowPoint, targetPoint);break;
        case "redSoldier": boolean = soldier(board, nowPoint, targetPoint);break;
        case "redGeneral": boolean = general(board, nowPoint, targetPoint);break;
        case "redSoldier2": boolean = soldier(board, nowPoint, targetPoint);break;
        case "redElephant2": boolean = elephant(board, nowPoint, targetPoint);break;
        case "redHorse2": boolean = horse(nowPoint, targetPoint);break;
        case "redCar2": boolean = car(nowPoint, targetPoint);break;
        case "redCannon": boolean = cannon(nowPoint, targetPoint);break;
        case "redCannon2": boolean = cannon(nowPoint, targetPoint);break;
        case "redPawn": boolean = pawn(board, nowPoint, targetPoint);break;
        case "redPawn2": boolean = pawn(board, nowPoint, targetPoint);break;
        case "redPawn3": boolean = pawn(board, nowPoint, targetPoint);break;
        case "redPawn4": boolean = pawn(board, nowPoint, targetPoint);break;
        case "redPawn5": boolean = pawn(board, nowPoint, targetPoint);break;
    }
    return boolean;
}

function getBoard(row, col) {
    return document.querySelector("#checkerboard > div[dy-row='"+row+"'][dy-col='"+col+"']");
}

//验证是否将军：蓝方将军红方/红方将军蓝方
function checkJiang() {
    let jiang = document.getElementById("jiang");
    for (let key in initData) {
        if ( (key.indexOf("blue") >= 0 && rules(key, initData[key], initData.redGeneral)) ||
             (key.indexOf("red") >= 0 && rules(key, initData[key], initData.blueGeneral)) ) {
            jiang.classList.remove("dy-middle-anim");
            void jiang.offsetWidth;//这个很重要，若无该语句，动画不能重新执行
            jiang.classList.add("dy-middle-anim");
        }
    }
}

//验证游戏结束
function gameOver() {
    /*
    * 判断对象是否包含某个key的方法
    * 方法一
    * !("key" in obj) //结果为false，表示不包含；否则表示包含
    * 方法二
    * obj.hasOwnProperty("key") //obj表示对象，结果为false表示不包含；否则表示包含
    * */
    return !initData.hasOwnProperty("blueGeneral") || !initData.hasOwnProperty("redGeneral");
}

//重开
function reloadGame() {
    document.getElementById("gameOver").style.display = "none";
    location.reload();
}

function btn(obj) {
    let dyName = obj.getAttribute("dy-name");
    let red = document.getElementById("red");
    let blue = document.getElementById("blue");
    let row = obj.getAttribute("dy-row");
    let col = obj.getAttribute("dy-col");
    if (dyName == null) {//走棋
        if (attackBoard == null) return;//未选中棋子，不处理

        //验证规则；验证不通过就不处理
        let targetPoint = {row: row, col: col};
        let nowPoint = {row: attackBoard.board.getAttribute("dy-row"), col: attackBoard.board.getAttribute("dy-col")};
        let board = attackBoard.board.getAttribute("dy-name");
        if (!rules(board, nowPoint, targetPoint)) return;

        //更新棋子库棋子坐标
        initData[board].row = row;
        initData[board].col = col;

        //实现走棋，更新界面棋子坐标
        obj.setAttribute("dy-name", board);
        obj.innerHTML = attackBoard.board.innerHTML;
        attackBoard.board.innerHTML = "";
        attackBoard.board.removeAttribute("dy-name");
        switch (attackBoard.camp) {
            case camp.blue://蓝方走棋
                blue.style.left = (col - 1) * 100 + "px";
                blue.style.top = (row - 1) * 100 + "px";
                attack = camp.red;//更换进攻方
                break;
            case camp.red://红方走棋
                red.style.left = (col - 1) * 100 + "px";
                red.style.top = (row - 1) * 100 + "px";
                attack = camp.blue;//更换进攻方
        }
        attackBoard = null;//走棋结束，重置当前棋子

        //验证是否将军：蓝方将军红方/红方将军蓝方
        checkJiang();
    } else if (dyName.indexOf("blue") >= 0) {//选择棋子或吃棋
        if (attack === camp.red) {//吃棋
            if (attackBoard == null) return;//未选中棋子，不处理

            //验证规则；验证不通过就不处理
            let targetPoint = {row: row, col: col};
            let nowPoint = {row: attackBoard.board.getAttribute("dy-row"), col: attackBoard.board.getAttribute("dy-col")};
            let board = attackBoard.board.getAttribute("dy-name");
            if (!rules(board, nowPoint, targetPoint)) return;

            //更新棋子库棋子坐标
            initData[board].row = row;
            initData[board].col = col;
            //删除被吃掉的棋子
            delete initData[dyName];

            //实现吃棋，更新界面棋子坐标
            obj.innerHTML = attackBoard.board.innerHTML;
            obj.setAttribute("dy-name", board);
            red.style.left = (col - 1) * 100 + "px";
            red.style.top = (row - 1) * 100 + "px";
            attack = camp.blue;
            attackBoard.board.innerHTML = "";
            attackBoard.board.removeAttribute("dy-name");
            attackBoard = null;

            //验证是否结束游戏
            if (gameOver(targetPoint)) {
                document.getElementById("gameOver").style.display = "";
                return;
            }

            //验证是否将军：蓝方将军红方/红方将军蓝方
            checkJiang();
            return;
        }
        red.style.display = "none";
        blue.style.left = (col - 1) * 100 + "px";
        blue.style.top = (row - 1) * 100 + "px";
        blue.style.display = "";
        attackBoard = {camp: camp.blue, board: obj};
    } else if (dyName.indexOf("red") >= 0) {//选择棋子或吃棋
        if (attack === camp.blue) {//吃棋
            if (attackBoard == null) return;//未选中棋子，不处理

            //验证规则；验证不通过就不处理
            let targetPoint = {row: row, col: col};
            let nowPoint = {row: attackBoard.board.getAttribute("dy-row"), col: attackBoard.board.getAttribute("dy-col")};
            let board = attackBoard.board.getAttribute("dy-name");
            if (!rules(board, nowPoint, targetPoint)) return;

            //更新棋子库棋子坐标
            initData[board].row = row;
            initData[board].col = col;
            //删除被吃掉的棋子
            delete initData[dyName];

            //实现吃棋，更新界面棋子坐标
            obj.innerHTML = attackBoard.board.innerHTML;
            obj.setAttribute("dy-name", attackBoard.board.getAttribute("dy-name"));
            blue.style.left = (col - 1) * 100 + "px";
            blue.style.top = (row - 1) * 100 + "px";
            attack = camp.red;
            attackBoard.board.innerHTML = "";
            attackBoard.board.removeAttribute("dy-name");
            attackBoard = null;

            //验证是否结束游戏
            if (gameOver(targetPoint)) {
                document.getElementById("gameOver").style.display = "";
                return;
            }

            //验证是否将军：蓝方将军红方/红方将军蓝方
            checkJiang();
            return;
        }
        blue.style.display = "none";
        red.style.left = (col - 1) * 100 + "px";
        red.style.top = (row - 1) * 100 + "px";
        red.style.display = "";
        attackBoard = {camp: camp.red, board: obj};
    }
}


//棋子初始化
for (let key in initData) {
    getBoard(initData[key].row, initData[key].col).innerHTML = "<img src='"+initData[key].url+"' />";
}


