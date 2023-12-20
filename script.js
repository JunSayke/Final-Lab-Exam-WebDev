const tasks = []

const queues = [[], [], [], []]

const queueBars = ["#queue1-bar", "#queue2-bar", "#queue3-bar", "#queue4-bar"]

const queueLists = [
	"#queue1-list",
	"#queue2-list",
	"#queue3-list",
	"#queue4-list",
]

const startingBarWidth = 5

$(document).ready(() => {
	$("#add-random-task").click(() => {
		const randNum = Math.floor(Math.random() * 200) + 1
		const randPrio = Math.floor(Math.random() * 10)
		tasks.push(randNum)
		const taskElem = $(
			`<div class="${randPrio > 6 ? "high-task" : "task"}">${randNum}</div>`
		)
		$("#task-queue").append(taskElem)
	})

	$("#admit-task").click(() => {
		const admitTaskElem = $("#task-queue")
		const firstTaskElem = admitTaskElem.find(":first-child")

		if (firstTaskElem && tasks.length != 0) {
			const balance_threshold = Math.min(...queues.map((queue) => queue.length))
			if (firstTaskElem.hasClass("high-task")) {
				firstTaskElem.removeClass("high-task").addClass("task")
				firstTaskElem.appendTo($(queueLists[0]))
				queues[0].push(tasks.shift())
			} else {
				for (let i = 1; i < queues.length; i++) {
					if (queues[i].length <= balance_threshold) {
						firstTaskElem.appendTo($(queueLists[i]))
						queues[i].push(tasks.shift())
						break
					}
				}
			}
		}
	})
})

setInterval(() => {
	for (let i = 0; i < queueBars.length; i++) {
		const width = $(queueBars[i]).width()
		if (width > startingBarWidth) {
			if (width == startingBarWidth + 1) {
				$(queueLists[i]).children(".task:first").remove()
			}
			$(queueBars[i]).width(width - 1)
		} else if (queues[i].length != 0) {
			$(queueBars[i]).width(width + queues[i].shift())
		}
	}
}, 20)
