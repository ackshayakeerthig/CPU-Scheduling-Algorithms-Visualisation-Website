#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <unistd.h>

#define MAX_PROCESSES 100

typedef struct
{
    int id;
    int arrival;
    int burst;
    int completion;
    int turnaround;
    int waiting;
} Process;

// Shared variables
int currentTime = 0;
pthread_mutex_t lock;

// Function prototypes
void *processThread(void *arg);
void printResults(Process processes[], int n);

int main()
{
    int n;
    Process processes[MAX_PROCESSES];
    pthread_t threads[MAX_PROCESSES];

    printf("Enter the number of processes: ");
    scanf("%d", &n);

    // Input process details
    for (int i = 0; i < n; i++)
    {
        printf("Enter arrival time and burst time for process %d: ", i + 1);
        processes[i].id = i + 1;
        scanf("%d %d", &processes[i].arrival, &processes[i].burst);
        processes[i].completion = 0;
        processes[i].turnaround = 0;
        processes[i].waiting = 0;
    }

    // Sort processes by arrival time (FCFS order)
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

    // Initialize the mutex
    pthread_mutex_init(&lock, NULL);

    // Create threads for each process
    for (int i = 0; i < n; i++)
    {
        pthread_create(&threads[i], NULL, processThread, (void *)&processes[i]);
    }

    // Wait for all threads to complete
    for (int i = 0; i < n; i++)
    {
        pthread_join(threads[i], NULL);
    }

    // Destroy the mutex
    pthread_mutex_destroy(&lock);

    // Print results
    printResults(processes, n);

    return 0;
}

void *processThread(void *arg)
{
    Process *process = (Process *)arg;

    // Wait until the current time reaches the process's arrival time
    while (1)
    {
        pthread_mutex_lock(&lock);
        if (currentTime >= process->arrival)
        {
            break;
        }
        pthread_mutex_unlock(&lock);
        usleep(1000); // Small delay to prevent busy waiting
    }

    // Simulate process execution
    printf("Process P%d is running at time %d\n", process->id, currentTime);
    int startTime = currentTime;
    currentTime += process->burst;
    process->completion = currentTime;

    // Calculate turnaround and waiting times
    process->turnaround = process->completion - process->arrival;
    process->waiting = process->turnaround - process->burst;

    printf("Process P%d completed at time %d\n", process->id, process->completion);
    pthread_mutex_unlock(&lock);

    return NULL;
}

void printResults(Process processes[], int n)
{
    printf("\nID\tArrival\tBurst\tCompletion\tTurnaround\tWaiting\n");
    for (int i = 0; i < n; i++)
    {
        printf("%d\t%d\t%d\t%d\t\t%d\t\t%d\n",
               processes[i].id,
               processes[i].arrival,
               processes[i].burst,
               processes[i].completion,
               processes[i].turnaround,
               processes[i].waiting);
    }
}
