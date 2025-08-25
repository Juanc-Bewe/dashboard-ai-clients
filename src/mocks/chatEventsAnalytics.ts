import type { ChatEventsAnalyticsResponse } from '../types/chat-events-analytics';

export const mockChatEventsAnalyticsData: ChatEventsAnalyticsResponse = {
    "success": true,
    "message": "Operación exitosa",
    "data": {
        "chatEventsMetrics": {
            "totalSessions": 104250,
            "sessionsWithChatDisplayed": 104141,
            "sessionsWithChatOpened": 5173,
            "sessionsWithBubbleClicked": 2281,
            "sessionsWithBubbleDismissed": 30303,
            "sessionsWithFirstMessageSent": 2968,
            "sessionsWithPrepromptClicked": 2015,
            "chatOpeningRate": 5,
            "messageConversionRate": 57.4,
            "prepromptUsageRate": 67.9,
            "timeToOpenChat": {
                "average": 259.8,
                "median": 20.2,
                "totalTime": 1343255.2,
                "sessionsCount": 5170
            },
            "timeToFirstMessage": {
                "average": 31.3,
                "median": 7.5,
                "totalTime": 92688.6,
                "sessionsCount": 2966
            },
            "timeFromDisplayToMessage": {
                "average": 198.8,
                "median": 35.7,
                "totalTime": 589572.3,
                "sessionsCount": 2966
            },
            "bubbleImpactInsights": {
                "totalBubbleInteractions": 32584,
                "clickedAfterDisplayed": 2275,
                "dismissedAfterDisplayed": 30198,
                "bubbleClickRate": 7,
                "averageTimeToOpenWithBubble": 57.2,
                "averageTimeToOpenWithoutBubble": 416.4,
                "bubbleSpeedsUpOpening": true
            },
            "conversationInitiationInsights": {
                "totalConversations": 2968,
                "initiatedByPreprompt": 2013,
                "initiatedByUserMessage": 955,
                "prepromptInitiationRate": 67.8,
                "averageTimeToSendWithPreprompt": 29.7,
                "averageTimeToSendWithoutPreprompt": 34.5
            }
        }
    },
    "timestamp": "2025-08-25T15:32:40.967Z",
    "path": "/lite/v1/analytics/chat/events?startDate=2025-08-01&endDate=2025-08-25&timezoneOffset=-5"
};
