#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX_PROCESSES 100

typedef struct
{
    int id;
    int arrival;
    int burst;
    int priority;
    int remaining;
    int completion;
    int turnaround;
    int waiting;
    float completionPercentage[100]; // Store progress percentage
    int ganttStart[100];
    int ganttEnd[100];
    int ganttCount;
} Process;

void inputProcesses(Process processes[], int *n);
void sortProcessesByArrival(Process processes[], int n);
int findNextProcessByPriority(Process processes[], int n, int currentTime);
void simulatePriorityScheduling(Process processes[], int n);
void printResults(Process processes[], int n);

int main()
{
    int n;
    Process processes[MAX_PROCESSES];

    // Input process details
    inputProcesses(processes, &n);

    // Sort by arrival time
    sortProcessesByArrival(processes, n);

    // Simulate Priority Scheduling
    simulatePriorityScheduling(processes, n);

    // Print results
    printResults(processes, n);

    return 0;
}

void inputProcesses(Process processes[], int *n)
{
    printf("Enter the number of processes: ");
    scanf("%d", n);

    for (int i = 0; i < *n; i++)
    {
        printf("Enter arrival time, burst time, and priority for process %d: ", i + 1);
        processes[i].id = i + 1;
        scanf("%d %d %d", &processes[i].arrival, &processes[i].burst, &processes[i].priority);
        processes[i].remaining = processes[i].burst;
        processes[i].completion = 0;
        processes[i].turnaround = 0;
        processes[i].waiting = 0;
        processes[i].ganttCount = 0;
    }
}

void sortProcessesByArrival(Process processes[], int n)
{
    for (int i = 0; i < n - 1; i++)
    {
        for (int j = 0; j < n - i - 1; j++)
        {
            if (processes[j].arrival > processes[j + 1].arrival)
            {
                Process temp = processes[j];
                processes[j] = processes[j + 1];
                processes[j + 1] = temp;
            }
        }
    }
}

int findNextProcessByPriority(Process processes[], int n, int currentTime)
{
    int highestPriority = __INT_MAX__;
    int returnIndex = -1;

    for (int i = 0; i < n; i++)
    {
        if (processes[i].arrival <= currentTime && // Process has arrived
            processes[i].remaining > 0 &&          // Process hasn't completed
            processes[i].priority < highestPriority)
        { // Higher priority (lower number)
            highestPriority = processes[i].priority;
            returnIndex = i;
        }
    }

    return returnIndex;
}

void simulatePriorityScheduling(Process processes[], int n)
{
    int currentTime = 0;
    int completed = 0;

    while (completed < n)
    {
        int currentIndex = findNextProcessByPriority(processes, n, currentTime);

        if (currentIndex == -1)
        {
            // No process is ready, increment time
            currentTime++;
            continue;
        }

        // Execute process for 1 unit of time
        processes[currentIndex].remaining--;
        processes[currentIndex].completionPercentage[processes[currentIndex].ganttCount] =
            (float)(processes[currentIndex].burst - processes[currentIndex].remaining) /
            processes[currentIndex].burst * 100;

        if (processes[currentIndex].ganttCount == 0 ||
            processes[currentIndex].ganttEnd[processes[currentIndex].ganttCount - 1] != currentTime)
        {
            processes[currentIndex].ganttStart[processes[currentIndex].ganttCount] = currentTime;
        }
        currentTime++;
        processes[currentIndex].ganttEnd[processes[currentIndex].ganttCount] = currentTime;

        // If process completes
        if (processes[currentIndex].remaining == 0)
        {
            completed++;
            processes[currentIndex].completion = currentTime;
            processes[currentIndex].turnaround =
                processes[currentIndex].completion - processes[currentIndex].arrival;
            processes[currentIndex].waiting =
                processes[currentIndex].turnaround - processes[currentIndex].burst;
            processes[currentIndex].ganttCount++;
        }
    }
}

void printResults(Process processes[], int n)
{
    printf("\nID\tArrival\tBurst\tPriority\tCompletion\tTurnaround\tWaiting\n");
    for (int i = 0; i < n; i++)
    {
        printf("%d\t%d\t%d\t%d\t\t%d\t\t%d\t\t%d\n",
               processes[i].id,
               processes[i].arrival,
               processes[i].burst,
               processes[i].priority,
               processes[i].completion,
               processes[i].turnaround,
               processes[i].waiting);
    }

    // Print Gantt Chart
    printf("\nGantt Chart:\n");
    for (int i = 0; i < n; i++)
    {
        printf("P%d: ", processes[i].id);
        for (int j = 0; j < processes[i].ganttCount; j++)
        {
            printf("[%d - %d] ", processes[i].ganttStart[j], processes[i].ganttEnd[j]);
        }
        printf("\n");
    }
}
