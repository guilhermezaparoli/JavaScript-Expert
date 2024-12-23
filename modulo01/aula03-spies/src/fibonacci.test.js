// fibonacci, o próximo número da sequência é a soma dos dois anteriores


const { createSandbox } = require("sinon");
const Fibonacci = require("./fibonacci");
const sinon = createSandbox();
const assert = require("assert")

; (async () => {
    {
        const fibonacci = new Fibonacci()
        const spy = sinon.spy(
            fibonacci,
            fibonacci.execute.name
        )
        for (const sequencia of fibonacci.execute(5)) {}
        const expectedCallCount = 6
        assert.strictEqual(spy.callCount, expectedCallCount)
        const {args} = spy.getCall(2)
        const expectedParams = [3, 1, 2]
        assert.deepStrictEqual(args, expectedParams, "Os arrays não são iguais")
    }
    {
        const fibonacci = new Fibonacci()
        const spy = sinon.spy(
            fibonacci,
                fibonacci.execute.name
            )
            const results = [...fibonacci.execute(5)]
            const expectedCallCount = 6
            assert.strictEqual(spy.callCount, expectedCallCount)

            const expectedResults = [0, 1, 1, 2, 3]
            assert.deepStrictEqual(results, expectedResults)
           
        }
    })()