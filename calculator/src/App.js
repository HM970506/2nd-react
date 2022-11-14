import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import {
  Background,
  Calculator,
  TextArea,
  ButtonArea,
  Button,
  OptionButton,
  SignButton,
} from "./component.js";

import {
  notcompleteToast,
  lengthcheckToast,
  cantzerodivisionToast,
  calcullengthcheckToast,
} from "./toasts.js";

const rank = new Map([
  ["+", 0],
  ["-", 0],
  ["X", 1],
  ["/", 1],
]);

function App() {
  const [state, setState] = useState("0");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    setPreview();
  }, [state]);

  //state에 모든 것을 담고 마지막에 파싱해서 계산.

  //결과값 미리보기가 뭐지

  const numberClick = (now) => {
    //15자리까지.
    const lengthcheck = state.split(" ").filter((x) => x != "");
    if (lengthcheck[lengthcheck.length - 1].length > 14) {
      return;
    }

    setState((state) => {
      if (state == "0" && now != ".") return now;
      else if (state == "0" && now == "0") return state;
      else return state + now;
    });
  };

  const deleteClick = () => {
    let after;
    if (state.length == 1) after = "0";
    else {
      let nowstate = state.trimEnd();
      after = nowstate.slice(0, nowstate.length - 1);
    }

    setState(after);
  };

  const resetClick = () => {
    setState("0");
  };

  const toggleClick = () => {
    const least = state.split(" ");
    let toggle = parseFloat(least.pop());
    toggle = toggle > 0 ? "-" + Math.abs(toggle) : Math.abs(toggle);
    toggle = least.length != 0 ? " " + toggle : toggle;

    setState(least.join(" ") + toggle);
  };

  const doublezeroClick = () => {
    const least = state.split(" ");
    let double = parseFloat(least.pop()) / 100;
    double = least.length != 0 ? " " + double : double;

    setState(least.join(" ") + double);
  };

  const signClick = (sign) => {
    //숫자입력 없을시 토스트메세지 출력
    if (state == "0") {
      notcompleteToast();
      return;
    }

    //중복입력시 자동변환
    const least = state.split(" ").filter((x) => x != "");
    let lastSign = least.pop();
    if (isNaN(lastSign)) setState(least.join(" ") + " " + sign + " ");
    else setState(state + " " + sign + " ");
  };

  const equalClick = () => {
    try {
      const total = state.split(" ").filter((x) => x != "");
      if (total.length < 3) {
        notcompleteToast();
        return;
      }
      const stack = [];
      const conclusion = [];

      //total을 돌면서 후위표기식으로 변환.
      for (let now of total) {
        //숫자는 바로 출력
        if (!isNaN(now)) conclusion.push(now);
        //부호는 우선순위 비교
        else {
          //스택이 비어있다면 그냥 넣고
          if (stack.length == 0) stack.push(now);
          else {
            //아니라면 스택의 top과 우선순위 비교해서
            //현재가 더 우선되면 스택 pop해서 coclusion에 넣기
            const nowRank = rank.get(now);
            while (
              nowRank <= rank.get(stack[stack.length - 1]) &&
              stack.length
            ) {
              conclusion.push(stack.pop());
            }
            stack.push(now);
          }
        }
      }

      const postfix = [...conclusion];
      while (stack.length) {
        postfix.push(stack.pop());
      }

      const stack2 = [];

      const parsing = (num) => {
        return parseFloat(num.toFixed(15)).toString();
      };

      for (let now of postfix) {
        if (!isNaN(now)) stack2.push(now);
        else {
          const end = parseFloat(stack2.pop());
          const front = parseFloat(stack2.pop());
          if (now == "+") {
            stack2.push(parsing(front + end));
          } else if (now == "-") {
            stack2.push(parsing(front - end));
          } else if (now == "X") {
            stack2.push(parsing(front * end));
          } else if (now == "/") {
            //0으로 나눌시 토스트메시지 출력
            if (end == "0") {
              cantzerodivisionToast();
              return;
            }
            stack2.push(parsing(front / end));
          }
        }
      }
      const answer = stack2.pop().toString();

      if (
        answer
          .split(".")
          .filter((x) => x != "")
          .toString().length > 15
      ) {
        calcullengthcheckToast();
        return;
      }

      setState(answer);
    } catch (error) {
      notcompleteToast();
    }
  };

  return (
    <Background>
      <ToastContainer />
      <Calculator>
        <TextArea>{state}</TextArea>
        <TextArea>{preview}</TextArea>
        <ButtonArea>
          <OptionButton onClick={resetClick}>C</OptionButton>
          <OptionButton onClick={toggleClick}>+/-</OptionButton>
          <OptionButton onClick={doublezeroClick}>%</OptionButton>
          <SignButton
            onClick={() => {
              signClick("/");
            }}
          >
            /
          </SignButton>
          <Button
            onClick={() => {
              numberClick("7");
            }}
          >
            7
          </Button>
          <Button
            onClick={() => {
              numberClick("8");
            }}
          >
            8
          </Button>
          <Button
            onClick={() => {
              numberClick("9");
            }}
          >
            9
          </Button>
          <SignButton
            onClick={() => {
              signClick("X");
            }}
          >
            X
          </SignButton>
          <Button
            onClick={() => {
              numberClick("4");
            }}
          >
            4
          </Button>
          <Button
            onClick={() => {
              numberClick("5");
            }}
          >
            5
          </Button>
          <Button
            onClick={() => {
              numberClick("6");
            }}
          >
            6
          </Button>
          <SignButton
            onClick={() => {
              signClick("-");
            }}
          >
            -
          </SignButton>
          <Button
            onClick={() => {
              numberClick("1");
            }}
          >
            1
          </Button>
          <Button
            onClick={() => {
              numberClick("2");
            }}
          >
            2
          </Button>
          <Button
            onClick={() => {
              numberClick("3");
            }}
          >
            3
          </Button>
          <SignButton
            onClick={() => {
              signClick("+");
            }}
          >
            +
          </SignButton>
          <Button onClick={deleteClick}>D</Button>
          <Button
            onClick={() => {
              numberClick("0");
            }}
          >
            0
          </Button>
          <Button
            onClick={() => {
              numberClick(".");
            }}
          >
            .
          </Button>
          <Button onClick={equalClick}>=</Button>
        </ButtonArea>
      </Calculator>
    </Background>
  );
}

export default App;
