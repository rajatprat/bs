# CSD (CS3031): what the exams ask, week by week

Built from 11 papers: Quiz 1, Quiz 2 and End-term papers from 2025 T2, 2025 T3 and 2026 T2. The 2025 T3 Quiz 2 is a scanned PDF, so it isn't fully read yet.

**Exam style:**
- Mostly **numeric answers** (3–5 marks), plus 1-mark **True/False** at the start of every end-term.
- The **same question types repeat every term with new numbers**.
- So each week's notes teach these types with a fixed recipe.

## Repeats in almost every paper (highest priority)

| Week | Question type | Seen in |
|---|---|---|
| 1 | Moore's Law True/False ("2M → 32M in N years") | every end-term |
| 1 | Unknown bases: (143)ₐ = (212)ᵦ | every Quiz 1 |
| 1 | Min bits to write a number / states vs flip-flops | Quiz 1, end-terms |
| 2–3 | Probability the output is 1 (or 0) with random inputs | every Quiz 1 |
| 2–3 | For which inputs is f = 1? (Σ minterms → "odd number of 1s" etc.) | every Quiz 1 |
| 3 | Minimum 2-input **NAND / NOR / XOR** gates for a function or timing diagram | every quiz and end-term |
| 4 | Minimum **2:1 / 4:1 multiplexers** for a function or circuit | every quiz and end-term |
| 4 | **Gate delay** of a mux or decoder (NOT/AND/OR delays given) | every Quiz 1 and end-term |
| 4 | Decoder / priority encoder output; decoder True/False | end-terms |
| 5 | K-map: minimized SOP/POS, number of literals | Quiz 1 |
| Arithmetic (W6 / ALU) | **2's complement** subtraction in 8 bits; 1's complement True/False | every end-term |
| 7 | **Gated D-latch** output after t ns (WE and D toggling) | Quiz 2, every end-term |
| 7 | JK toggle / D flip-flop edge / feedback True/False | every Quiz 2 |
| 8 | Sequence with JK flip-flops (find J, K); logic for a D flip-flop from a table | Quiz 2, end-term |
| 9 | **Mod-N counter** state after k pulses | every end-term |
| 9 | **Johnson counter** number of states (= 2n) | every end-term |
| 9 | D flip-flops + NAND circuit: state after k pulses; JK output sequence | every end-term and Quiz 2 |
| 10–12 | **Instruction bits** (registers + ALU operations) | every end-term |
| 10–12 | **Control word in hex** for a register transfer | every end-term |
| 10–12 | **Machine code in hex** for an instruction | every end-term |

## Flags found while checking answers
- **2025 T3 Quiz 1, (234)ₐ = (143)ᵦ:** the official answer a=4, b=5 fits the equation, but base 4 can't contain the digit 4. Week 1 tells students to trust the equation.
- **2025 T3 End-term (AN), 2's complement "A − B, A = 180, B = 50":** the key says 01100010 (= 98), but 180 − 50 = 130 = 10000010. Also, 180 doesn't fit in 8-bit signed numbers. I'll recheck this against the question image when writing the arithmetic week.
