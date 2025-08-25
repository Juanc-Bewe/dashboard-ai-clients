// Time metrics interface
export interface TimeMetrics {
  average: number;
  median: number;
  totalTime: number;
  sessionsCount: number;
}

// Bubble impact insights interface
export interface BubbleImpactInsights {
  totalBubbleInteractions: number;
  clickedAfterDisplayed: number;
  dismissedAfterDisplayed: number;
  bubbleClickRate: number;
  averageTimeToOpenWithBubble: number;
  averageTimeToOpenWithoutBubble: number;
  bubbleSpeedsUpOpening: boolean;
}

// Conversation initiation insights interface
export interface ConversationInitiationInsights {
  totalConversations: number;
  initiatedByPreprompt: number;
  initiatedByUserMessage: number;
  prepromptInitiationRate: number;
  averageTimeToSendWithPreprompt: number;
  averageTimeToSendWithoutPreprompt: number;
}

// Chat events metrics interface
export interface ChatEventsMetrics {
  totalSessions: number;
  sessionsWithChatDisplayed: number;
  sessionsWithChatOpened: number;
  sessionsWithBubbleClicked: number;
  sessionsWithBubbleDismissed: number;
  sessionsWithFirstMessageSent: number;
  sessionsWithPrepromptClicked: number;
  chatOpeningRate: number;
  messageConversionRate: number;
  prepromptUsageRate: number;
  timeToOpenChat: TimeMetrics;
  timeToFirstMessage: TimeMetrics;
  timeFromDisplayToMessage: TimeMetrics;
  bubbleImpactInsights: BubbleImpactInsights;
  conversationInitiationInsights: ConversationInitiationInsights;
}

// Chat events analytics data interface
export interface ChatEventsAnalyticsData {
  chatEventsMetrics: ChatEventsMetrics;
}

// API Response interface
export interface ChatEventsAnalyticsResponse {
  success: boolean;
  message: string;
  data: ChatEventsAnalyticsData;
  timestamp: string;
  path: string;
}
