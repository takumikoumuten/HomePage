#!/bin/bash

# 完了したタスクの数
completed_tasks=0
# 未完了のタスクの数
incomplete_tasks=0

# 標準入力からTODOリストを読み込みながら、完了したタスクと未完了のタスクの数を数える
while IFS= read -r line; do
    if [[ "$line" == *"- DONE "* ]]; then
	((completed_tasks++))
    elif [[ "$line" == *"- TODO "* ]]; then
	((incomplete_tasks++))
    fi
done

# タスクの完了度合いを計算
total_tasks=$((completed_tasks + incomplete_tasks))
completion_percentage=0

if ((total_tasks > 0)); then
    completion_percentage=$((completed_tasks * 100 / total_tasks))
fi

# 結果を表示
echo "Total tasks: $total_tasks"
echo "Completed tasks: $completed_tasks"
echo "Incomplete tasks: $incomplete_tasks"
echo "Completion percentage: $completion_percentage%"
