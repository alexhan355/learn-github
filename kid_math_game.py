#!/usr/bin/env python3
"""5岁小朋友数学练习小游戏。"""

import random


def generate_question():
    """生成10以内加减法，确保结果不为负数。"""
    op = random.choice(["+", "-"])
    a = random.randint(0, 10)
    b = random.randint(0, 10)

    if op == "-" and b > a:
        a, b = b, a

    answer = a + b if op == "+" else a - b
    return f"{a} {op} {b} = ?", answer


def ask_int(prompt):
    """获取整数输入，输入 q 可退出。"""
    while True:
        text = input(prompt).strip().lower()
        if text in {"q", "quit", "退出"}:
            return None
        if text.isdigit():
            return int(text)
        print("请输入数字哦（例如 3），或输入 q 结束游戏。")


def main():
    print("🌟 欢迎来到小小数学乐园！")
    print("我们来做 10 以内加减法练习吧。输入 q 可以随时退出。\n")

    total = 0
    correct = 0

    while True:
        question, answer = generate_question()
        user_answer = ask_int(f"{question} ")

        if user_answer is None:
            break

        total += 1
        if user_answer == answer:
            correct += 1
            print("🎉 答对啦！你真棒！\n")
        else:
            print(f"💡 再想想哦，正确答案是 {answer}。\n")

    print("\n游戏结束～")
    if total == 0:
        print("你还没有答题，下次一起加油！")
    else:
        print(f"你一共做了 {total} 题，答对 {correct} 题。")
        if correct == total:
            print("🏆 全部答对！超级厉害！")
        elif correct / total >= 0.7:
            print("👏 很不错，再练一练会更棒！")
        else:
            print("💪 继续练习，你会越来越厉害！")


if __name__ == "__main__":
    main()
