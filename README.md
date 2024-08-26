Project Description:

TaskMaster is a Node.js API designed to handle user-specific tasks with rate limiting and task queuing. The API allows each user to queue tasks while adhering to strict rate limits, ensuring that no more than one task is processed per second and no more than 20 tasks per minute per user. Tasks are queued and processed according to these limits, with logs stored for each completed task.

Project Structure:

	•	/config: Configuration settings.
	•	/controllers: Route controllers.
	•	/middleware: Middleware for rate limiting.
	•	/queues: Task queuing logic using Redis.
	•	/routes: API route definitions.
	•	/services: Logging services.
	•	/logs: Log files for task completions.



## Features

- **Rate Limiting**: Limits tasks to 1 per second and 20 per minute per user.
- **Task Queuing**: Tasks exceeding rate limits are queued and processed later.
- **Logging**: Logs task completion with user ID and timestamp.
- **Clustered Environment**: Utilizes Node.js cluster module to handle multiple workers.

## Getting Started

### Prerequisites

- Node.js (v14 or above)
- Redis (used for task queuing and rate limiting)
- npm (Node Package Manager)
- 
<b>Contributing</b>

Contributions are welcome! Please fork this repository and submit a pull request with your changes.

