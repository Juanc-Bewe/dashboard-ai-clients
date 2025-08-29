export default {
	"success": true,
	"message": "Operación exitosa",
	"data": {
		"timezoneOffset": -5,
		"currentPeriod": {
			"dateRange": {
				"startDate": "2025-06-19T00:00:00.000Z",
				"endDate": "2025-06-23T23:59:59.999Z"
			},
			"metrics": {
				"totalConversations": 394,
				"totalAccountsWithConversations": 133,
				"totalConversationsWithIdentification": 130,
				"totalNewClients": 102,
				"customerRetentionPercentage": 7.69,
				"returningClients": 9,
				"totalUniqueClients": 117,
				"identificationPercentage": 32.99,
				"medianMessagesPerConversation": 2,
				"medianConversationDuration": 96,
				"resolutionRate": 16.75,
				"adjustedResolutionRate": 83.76,
				"medianUserFeeling": 2,
				"userFeelingDistribution": {
					"1": {
						"count": 4,
						"percentage": 1.02
					},
					"2": {
						"count": 362,
						"percentage": 91.88
					},
					"3": {
						"count": 28,
						"percentage": 7.11
					}
				},
				"errorRate": 1.78,
				"totalSpam": 19,
				"channelDistribution": {
					"web": {
						"count": 294,
						"percentage": 74.62
					},
					"twilio-whatsapp": {
						"count": 100,
						"percentage": 25.38
					}
				},
				"peakUsageHours": {
					"0": 8,
					"1": 1,
					"2": 4,
					"3": 6,
					"4": 2,
					"5": 2,
					"6": 9,
					"7": 13,
					"8": 19,
					"9": 34,
					"10": 21,
					"11": 21,
					"12": 38,
					"13": 23,
					"14": 23,
					"15": 20,
					"16": 27,
					"17": 28,
					"18": 19,
					"19": 15,
					"20": 19,
					"21": 19,
					"22": 13,
					"23": 10
				},
				"weekdayDistribution": {
					"0": 54,
					"1": 113,
					"2": 0,
					"3": 0,
					"4": 27,
					"5": 112,
					"6": 88
				},
				"totalCost": 2.07081,
				"medianTotalCostPerConversation": 0.003595,
				"averageTotalCostPerConversation": 0.005256,
				"medianCostByCategory": {
					"llm": 0.00255,
					"tools": 0.0015,
					"tracing": 0.001
				},
				"averageCostByCategory": {
					"llm": 0.003621,
					"tools": 0.001922,
					"tracing": 0.001478
				},
				"costDistribution": {
					"llm": {
						"cost": 1.42681,
						"percentage": 68.9
					},
					"tools": {
						"cost": 0.0615,
						"percentage": 3
					},
					"tracing": {
						"cost": 0.5825,
						"percentage": 28.1
					}
				},
				"llmModelDistributionByTokens": {
					"gemini-2.5-flash": {
						"totalTokens": 1940543,
						"percentage": 94.9
					},
					"gemini-2.0-flash-lite-001": {
						"totalTokens": 86894,
						"percentage": 4.2
					},
					"gemini-2.0-flash-001": {
						"totalTokens": 17991,
						"percentage": 0.9
					}
				},
				"llmModelDistributionByCost": {
					"gemini-2.5-flash": {
						"cost": 1.41668,
						"percentage": 99.3
					},
					"gemini-2.0-flash-lite-001": {
						"cost": 0.0071,
						"percentage": 0.5
					},
					"gemini-2.0-flash-001": {
						"cost": 0.00303,
						"percentage": 0.2
					}
				},
				"topExpensiveAccounts": [
					{
						"accountId": "67868eb3924828a7ec055344",
						"accountName": "RESPAT ESP S.A.S",
						"sessionCount": 20,
						"totalCost": 0.10121
					},
					{
						"accountId": "6401f52599bdcb6fc85fdbbe",
						"accountName": "Ortopedia Chiavassa",
						"sessionCount": 16,
						"totalCost": 0.10102
					},
					{
						"accountId": "664c7cfbd46bbd66f562a8a9",
						"accountName": "C. & B. Papeles De Colombia S.A.S",
						"sessionCount": 14,
						"totalCost": 0.09363
					},
					{
						"accountId": "664c7c44492578d1f413d7e5",
						"accountName": "Diana Isabel Romero Pantoja",
						"sessionCount": 6,
						"totalCost": 0.09238
					},
					{
						"accountId": "664e4dabe644e98902fbd089",
						"accountName": "Empresa Flota Cachira Ltda",
						"sessionCount": 14,
						"totalCost": 0.08612
					},
					{
						"accountId": "680b9a56d92c3e10a5215ef3",
						"accountName": "Maye Peluquería Hair Stylist & Makeup Artist",
						"sessionCount": 9,
						"totalCost": 0.06024
					},
					{
						"accountId": "664bbc4f7c70859e581aede2",
						"accountName": "Star Express Soluciones En Transporte S.A.S.",
						"sessionCount": 12,
						"totalCost": 0.05531
					},
					{
						"accountId": "6835074c12a92bf52a38c058",
						"accountName": "Psicologa Maria Paula test",
						"sessionCount": 2,
						"totalCost": 0.0513
					},
					{
						"accountId": "664e56ebb581256a3314e21a",
						"accountName": "Sisocol Cabarcas-Carreño S.A.S.",
						"sessionCount": 3,
						"totalCost": 0.04561
					},
					{
						"accountId": "664b703331ba90e1b7d76605",
						"accountName": "COMERCIALIZADORA METÁLICA S.A",
						"sessionCount": 12,
						"totalCost": 0.03962
					},
					{
						"accountId": "664bc506492578d1f4117580",
						"accountName": "ALFREDO FERNANDEZ VEGA",
						"sessionCount": 10,
						"totalCost": 0.03852
					},
					{
						"accountId": "64026267b6a906feb5309c82",
						"accountName": "Purtermica",
						"sessionCount": 6,
						"totalCost": 0.03623
					},
					{
						"accountId": "6400c9a22d65e67731d7f972",
						"accountName": "AKROMEDICA",
						"sessionCount": 8,
						"totalCost": 0.03521
					},
					{
						"accountId": "664bc2f84db6a64a7ec05a5d",
						"accountName": "SOCIEDAD RADIOLOGICA VALLE MAULE LIA",
						"sessionCount": 6,
						"totalCost": 0.03353
					},
					{
						"accountId": "640128894caadaec67bf9431",
						"accountName": "Todogoma",
						"sessionCount": 7,
						"totalCost": 0.03268
					},
					{
						"accountId": "5c4ad9e4bea1cb0caf04fb83",
						"accountName": "RECOVERYROOM ",
						"sessionCount": 5,
						"totalCost": 0.03206
					},
					{
						"accountId": "58eabe47a548df01320014b0",
						"accountName": "Longoso's",
						"sessionCount": 8,
						"totalCost": 0.03087
					},
					{
						"accountId": "64023df01c14571181910415",
						"accountName": "VIVERO PORTA",
						"sessionCount": 5,
						"totalCost": 0.03049
					},
					{
						"accountId": "5b7ee2a204c0b7632ef60458",
						"accountName": "La Cabina",
						"sessionCount": 2,
						"totalCost": 0.02676
					},
					{
						"accountId": "664be8710155e2315e2191d9",
						"accountName": "Algofer Sas",
						"sessionCount": 7,
						"totalCost": 0.02674
					}
				],
				"toolsDistributionByAmount": {
					"get_services": {
						"amount": 151,
						"percentage": 53.7
					},
					"get_products": {
						"amount": 57,
						"percentage": 20.3
					},
					"generate_appointment_link": {
						"amount": 30,
						"percentage": 10.7
					},
					"deepKnowledgeSearch": {
						"amount": 41,
						"percentage": 14.6
					},
					"get_booking_management_link": {
						"amount": 1,
						"percentage": 0.4
					},
					"generate_purchase_link": {
						"amount": 1,
						"percentage": 0.4
					}
				},
				"toolsDistributionByCost": {
					"get_services": {
						"cost": 0,
						"percentage": 0
					},
					"get_products": {
						"cost": 0,
						"percentage": 0
					},
					"generate_appointment_link": {
						"cost": 0,
						"percentage": 0
					},
					"deepKnowledgeSearch": {
						"cost": 0.0615,
						"percentage": 100
					},
					"get_booking_management_link": {
						"cost": 0,
						"percentage": 0
					},
					"generate_purchase_link": {
						"cost": 0,
						"percentage": 0
					}
				},
				"agentsDistributionByAmount": {
					"services_agent": {
						"amount": 171,
						"percentage": 63.1
					},
					"products_agent": {
						"amount": 59,
						"percentage": 21.8
					},
					"knowledge_base_agent": {
						"amount": 41,
						"percentage": 15.1
					}
				},
				"agentsDistributionByCost": {
					"services_agent": {
						"cost": 0,
						"percentage": 0
					},
					"products_agent": {
						"cost": 0,
						"percentage": 0
					},
					"knowledge_base_agent": {
						"cost": 0,
						"percentage": 0
					}
				}
			},
			"dailyMetrics": [
				{
					"date": "2025-06-19",
					"totalConversations": 27,
					"conversationsWithIdentification": 13,
					"newClients": 10,
					"medianMessagesPerConversation": 3,
					"medianConversationDuration": 149,
					"resolutionRate": 37.04,
					"adjustedResolutionRate": 88.89,
					"medianUserFeeling": 2,
					"errorRate": 3.7,
					"spamCount": 0,
					"peakUsageHours": {
						"0": 0,
						"1": 0,
						"2": 1,
						"3": 0,
						"4": 0,
						"5": 0,
						"6": 0,
						"7": 0,
						"8": 3,
						"9": 4,
						"10": 0,
						"11": 0,
						"12": 1,
						"13": 1,
						"14": 1,
						"15": 3,
						"16": 4,
						"17": 2,
						"18": 1,
						"19": 2,
						"20": 1,
						"21": 1,
						"22": 0,
						"23": 2
					},
					"totalCost": 0.14131,
					"medianTotalCostPerConversation": 0.00561,
					"averageTotalCostPerConversation": 0.005234,
					"medianCostByCategory": {
						"llm": 0.00264,
						"tools": 0.00225,
						"tracing": 0.0015
					},
					"averageCostByCategory": {
						"llm": 0.003382,
						"tools": 0.00225,
						"tracing": 0.001519
					},
					"costDistribution": {
						"llm": {
							"cost": 0.09131,
							"percentage": 64.6
						},
						"tools": {
							"cost": 0.009,
							"percentage": 6.4
						},
						"tracing": {
							"cost": 0.041,
							"percentage": 29
						}
					},
					"llmModelDistributionByTokens": {
						"gemini-2.5-flash": {
							"totalTokens": 108727,
							"percentage": 100
						}
					},
					"llmModelDistributionByCost": {
						"gemini-2.5-flash": {
							"cost": 0.09131,
							"percentage": 100
						}
					},
					"toolsDistributionByAmount": {
						"get_services": {
							"amount": 12,
							"percentage": 54.5
						},
						"deepKnowledgeSearch": {
							"amount": 6,
							"percentage": 27.3
						},
						"get_products": {
							"amount": 2,
							"percentage": 9.1
						},
						"generate_appointment_link": {
							"amount": 2,
							"percentage": 9.1
						}
					},
					"toolsDistributionByCost": {
						"get_services": {
							"cost": 0,
							"percentage": 0
						},
						"deepKnowledgeSearch": {
							"cost": 0.009,
							"percentage": 100
						},
						"get_products": {
							"cost": 0,
							"percentage": 0
						},
						"generate_appointment_link": {
							"cost": 0,
							"percentage": 0
						}
					},
					"agentsDistributionByAmount": {
						"services_agent": {
							"amount": 13,
							"percentage": 61.9
						},
						"knowledge_base_agent": {
							"amount": 6,
							"percentage": 28.6
						},
						"products_agent": {
							"amount": 2,
							"percentage": 9.5
						}
					},
					"agentsDistributionByCost": {
						"services_agent": {
							"cost": 0,
							"percentage": 0
						},
						"knowledge_base_agent": {
							"cost": 0,
							"percentage": 0
						},
						"products_agent": {
							"cost": 0,
							"percentage": 0
						}
					}
				},
				{
					"date": "2025-06-20",
					"totalConversations": 112,
					"conversationsWithIdentification": 31,
					"newClients": 26,
					"medianMessagesPerConversation": 2,
					"medianConversationDuration": 78,
					"resolutionRate": 14.29,
					"adjustedResolutionRate": 86.61,
					"medianUserFeeling": 2,
					"errorRate": 2.68,
					"spamCount": 5,
					"peakUsageHours": {
						"0": 2,
						"1": 1,
						"2": 0,
						"3": 2,
						"4": 0,
						"5": 1,
						"6": 1,
						"7": 4,
						"8": 8,
						"9": 7,
						"10": 5,
						"11": 12,
						"12": 17,
						"13": 6,
						"14": 6,
						"15": 2,
						"16": 8,
						"17": 9,
						"18": 7,
						"19": 2,
						"20": 3,
						"21": 2,
						"22": 5,
						"23": 2
					},
					"totalCost": 0.5384,
					"medianTotalCostPerConversation": 0.003565,
					"averageTotalCostPerConversation": 0.004807,
					"medianCostByCategory": {
						"llm": 0.00246,
						"tools": 0.0015,
						"tracing": 0.001
					},
					"averageCostByCategory": {
						"llm": 0.003245,
						"tools": 0.001875,
						"tracing": 0.001429
					},
					"costDistribution": {
						"llm": {
							"cost": 0.3634,
							"percentage": 67.5
						},
						"tools": {
							"cost": 0.015,
							"percentage": 2.8
						},
						"tracing": {
							"cost": 0.16,
							"percentage": 29.7
						}
					},
					"llmModelDistributionByTokens": {
						"gemini-2.5-flash": {
							"totalTokens": 443077,
							"percentage": 100
						}
					},
					"llmModelDistributionByCost": {
						"gemini-2.5-flash": {
							"cost": 0.3634,
							"percentage": 100
						}
					},
					"toolsDistributionByAmount": {
						"get_services": {
							"amount": 37,
							"percentage": 52.9
						},
						"get_products": {
							"amount": 15,
							"percentage": 21.4
						},
						"generate_appointment_link": {
							"amount": 8,
							"percentage": 11.4
						},
						"deepKnowledgeSearch": {
							"amount": 10,
							"percentage": 14.3
						}
					},
					"toolsDistributionByCost": {
						"get_services": {
							"cost": 0,
							"percentage": 0
						},
						"get_products": {
							"cost": 0,
							"percentage": 0
						},
						"generate_appointment_link": {
							"cost": 0,
							"percentage": 0
						},
						"deepKnowledgeSearch": {
							"cost": 0.015,
							"percentage": 100
						}
					},
					"agentsDistributionByAmount": {
						"services_agent": {
							"amount": 40,
							"percentage": 59.7
						},
						"products_agent": {
							"amount": 16,
							"percentage": 23.9
						},
						"knowledge_base_agent": {
							"amount": 11,
							"percentage": 16.4
						}
					},
					"agentsDistributionByCost": {
						"services_agent": {
							"cost": 0,
							"percentage": 0
						},
						"products_agent": {
							"cost": 0,
							"percentage": 0
						},
						"knowledge_base_agent": {
							"cost": 0,
							"percentage": 0
						}
					}
				},
				{
					"date": "2025-06-21",
					"totalConversations": 88,
					"conversationsWithIdentification": 38,
					"newClients": 24,
					"medianMessagesPerConversation": 2,
					"medianConversationDuration": 109,
					"resolutionRate": 18.18,
					"adjustedResolutionRate": 75,
					"medianUserFeeling": 2,
					"errorRate": 2.27,
					"spamCount": 7,
					"peakUsageHours": {
						"0": 1,
						"1": 0,
						"2": 1,
						"3": 1,
						"4": 1,
						"5": 1,
						"6": 5,
						"7": 6,
						"8": 6,
						"9": 9,
						"10": 4,
						"11": 3,
						"12": 9,
						"13": 5,
						"14": 4,
						"15": 7,
						"16": 5,
						"17": 4,
						"18": 2,
						"19": 2,
						"20": 4,
						"21": 5,
						"22": 1,
						"23": 2
					},
					"totalCost": 0.46432,
					"medianTotalCostPerConversation": 0.00382,
					"averageTotalCostPerConversation": 0.005276,
					"medianCostByCategory": {
						"llm": 0.00264,
						"tools": 0.0015,
						"tracing": 0.001
					},
					"averageCostByCategory": {
						"llm": 0.003362,
						"tools": 0.001929,
						"tracing": 0.001761
					},
					"costDistribution": {
						"llm": {
							"cost": 0.29582,
							"percentage": 63.7
						},
						"tools": {
							"cost": 0.0135,
							"percentage": 2.9
						},
						"tracing": {
							"cost": 0.155,
							"percentage": 33.4
						}
					},
					"llmModelDistributionByTokens": {
						"gemini-2.5-flash": {
							"totalTokens": 358750,
							"percentage": 100
						}
					},
					"llmModelDistributionByCost": {
						"gemini-2.5-flash": {
							"cost": 0.29582,
							"percentage": 100
						}
					},
					"toolsDistributionByAmount": {
						"get_services": {
							"amount": 54,
							"percentage": 55.1
						},
						"deepKnowledgeSearch": {
							"amount": 9,
							"percentage": 9.2
						},
						"generate_appointment_link": {
							"amount": 13,
							"percentage": 13.3
						},
						"get_booking_management_link": {
							"amount": 1,
							"percentage": 1
						},
						"get_products": {
							"amount": 20,
							"percentage": 20.4
						},
						"generate_purchase_link": {
							"amount": 1,
							"percentage": 1
						}
					},
					"toolsDistributionByCost": {
						"get_services": {
							"cost": 0,
							"percentage": 0
						},
						"deepKnowledgeSearch": {
							"cost": 0.0135,
							"percentage": 100
						},
						"generate_appointment_link": {
							"cost": 0,
							"percentage": 0
						},
						"get_booking_management_link": {
							"cost": 0,
							"percentage": 0
						},
						"get_products": {
							"cost": 0,
							"percentage": 0
						},
						"generate_purchase_link": {
							"cost": 0,
							"percentage": 0
						}
					},
					"agentsDistributionByAmount": {
						"services_agent": {
							"amount": 65,
							"percentage": 69.9
						},
						"knowledge_base_agent": {
							"amount": 8,
							"percentage": 8.6
						},
						"products_agent": {
							"amount": 20,
							"percentage": 21.5
						}
					},
					"agentsDistributionByCost": {
						"services_agent": {
							"cost": 0,
							"percentage": 0
						},
						"knowledge_base_agent": {
							"cost": 0,
							"percentage": 0
						},
						"products_agent": {
							"cost": 0,
							"percentage": 0
						}
					}
				},
				{
					"date": "2025-06-22",
					"totalConversations": 54,
					"conversationsWithIdentification": 12,
					"newClients": 11,
					"medianMessagesPerConversation": 1,
					"medianConversationDuration": 64,
					"resolutionRate": 11.11,
					"adjustedResolutionRate": 88.89,
					"medianUserFeeling": 2,
					"errorRate": 1.85,
					"spamCount": 3,
					"peakUsageHours": {
						"0": 3,
						"1": 0,
						"2": 2,
						"3": 2,
						"4": 0,
						"5": 0,
						"6": 1,
						"7": 1,
						"8": 0,
						"9": 4,
						"10": 2,
						"11": 1,
						"12": 0,
						"13": 6,
						"14": 5,
						"15": 2,
						"16": 0,
						"17": 4,
						"18": 5,
						"19": 5,
						"20": 2,
						"21": 6,
						"22": 1,
						"23": 2
					},
					"totalCost": 0.24339,
					"medianTotalCostPerConversation": 0.002915,
					"averageTotalCostPerConversation": 0.004507,
					"medianCostByCategory": {
						"llm": 0.00229,
						"tools": 0.0015,
						"tracing": 0.0005
					},
					"averageCostByCategory": {
						"llm": 0.003155,
						"tools": 0.0015,
						"tracing": 0.001241
					},
					"costDistribution": {
						"llm": {
							"cost": 0.17039,
							"percentage": 70
						},
						"tools": {
							"cost": 0.006,
							"percentage": 2.5
						},
						"tracing": {
							"cost": 0.067,
							"percentage": 27.5
						}
					},
					"llmModelDistributionByTokens": {
						"gemini-2.5-flash": {
							"totalTokens": 210391,
							"percentage": 100
						}
					},
					"llmModelDistributionByCost": {
						"gemini-2.5-flash": {
							"cost": 0.17039,
							"percentage": 100
						}
					},
					"toolsDistributionByAmount": {
						"deepKnowledgeSearch": {
							"amount": 4,
							"percentage": 28.6
						},
						"get_services": {
							"amount": 9,
							"percentage": 64.3
						},
						"generate_appointment_link": {
							"amount": 1,
							"percentage": 7.1
						}
					},
					"toolsDistributionByCost": {
						"deepKnowledgeSearch": {
							"cost": 0.006,
							"percentage": 100
						},
						"get_services": {
							"cost": 0,
							"percentage": 0
						},
						"generate_appointment_link": {
							"cost": 0,
							"percentage": 0
						}
					},
					"agentsDistributionByAmount": {
						"knowledge_base_agent": {
							"amount": 4,
							"percentage": 26.7
						},
						"services_agent": {
							"amount": 11,
							"percentage": 73.3
						}
					},
					"agentsDistributionByCost": {
						"knowledge_base_agent": {
							"cost": 0,
							"percentage": 0
						},
						"services_agent": {
							"cost": 0,
							"percentage": 0
						}
					}
				},
				{
					"date": "2025-06-23",
					"totalConversations": 113,
					"conversationsWithIdentification": 36,
					"newClients": 31,
					"medianMessagesPerConversation": 2,
					"medianConversationDuration": 97,
					"resolutionRate": 15.93,
					"adjustedResolutionRate": 84.07,
					"medianUserFeeling": 2,
					"errorRate": 0,
					"spamCount": 4,
					"peakUsageHours": {
						"0": 2,
						"1": 0,
						"2": 0,
						"3": 1,
						"4": 1,
						"5": 0,
						"6": 2,
						"7": 2,
						"8": 2,
						"9": 10,
						"10": 10,
						"11": 5,
						"12": 11,
						"13": 5,
						"14": 7,
						"15": 6,
						"16": 10,
						"17": 9,
						"18": 4,
						"19": 4,
						"20": 9,
						"21": 5,
						"22": 6,
						"23": 2
					},
					"totalCost": 0.68339,
					"medianTotalCostPerConversation": 0.00386,
					"averageTotalCostPerConversation": 0.006048,
					"medianCostByCategory": {
						"llm": 0.00261,
						"tools": 0.0015,
						"tracing": 0.001
					},
					"averageCostByCategory": {
						"llm": 0.004477,
						"tools": 0.002,
						"tracing": 0.001412
					},
					"costDistribution": {
						"llm": {
							"cost": 0.50589,
							"percentage": 74
						},
						"tools": {
							"cost": 0.018,
							"percentage": 2.6
						},
						"tracing": {
							"cost": 0.1595,
							"percentage": 23.3
						}
					},
					"llmModelDistributionByTokens": {
						"gemini-2.5-flash": {
							"totalTokens": 819598,
							"percentage": 88.7
						},
						"gemini-2.0-flash-lite-001": {
							"totalTokens": 86894,
							"percentage": 9.4
						},
						"gemini-2.0-flash-001": {
							"totalTokens": 17991,
							"percentage": 1.9
						}
					},
					"llmModelDistributionByCost": {
						"gemini-2.5-flash": {
							"cost": 0.49576,
							"percentage": 98
						},
						"gemini-2.0-flash-lite-001": {
							"cost": 0.0071,
							"percentage": 1.4
						},
						"gemini-2.0-flash-001": {
							"cost": 0.00303,
							"percentage": 0.6
						}
					},
					"toolsDistributionByAmount": {
						"get_services": {
							"amount": 39,
							"percentage": 50.6
						},
						"deepKnowledgeSearch": {
							"amount": 12,
							"percentage": 15.6
						},
						"generate_appointment_link": {
							"amount": 6,
							"percentage": 7.8
						},
						"get_products": {
							"amount": 20,
							"percentage": 26
						}
					},
					"toolsDistributionByCost": {
						"get_services": {
							"cost": 0,
							"percentage": 0
						},
						"deepKnowledgeSearch": {
							"cost": 0.018,
							"percentage": 100
						},
						"generate_appointment_link": {
							"cost": 0,
							"percentage": 0
						},
						"get_products": {
							"cost": 0,
							"percentage": 0
						}
					},
					"agentsDistributionByAmount": {
						"services_agent": {
							"amount": 42,
							"percentage": 56
						},
						"knowledge_base_agent": {
							"amount": 12,
							"percentage": 16
						},
						"products_agent": {
							"amount": 21,
							"percentage": 28
						}
					},
					"agentsDistributionByCost": {
						"services_agent": {
							"cost": 0,
							"percentage": 0
						},
						"knowledge_base_agent": {
							"cost": 0,
							"percentage": 0
						},
						"products_agent": {
							"cost": 0,
							"percentage": 0
						}
					}
				}
			]
		},
		"previousPeriod": {
			"dateRange": {
				"startDate": "2025-06-14T00:00:00.000Z",
				"endDate": "2025-06-18T23:59:59.999Z"
			},
			"metrics": {
				"totalConversations": 8,
				"totalAccountsWithConversations": 8,
				"totalConversationsWithIdentification": 3,
				"totalNewClients": 2,
				"customerRetentionPercentage": 0,
				"returningClients": 0,
				"totalUniqueClients": 3,
				"identificationPercentage": 37.5,
				"medianMessagesPerConversation": 2.5,
				"medianConversationDuration": 80,
				"resolutionRate": 37.5,
				"adjustedResolutionRate": 100,
				"medianUserFeeling": 2,
				"userFeelingDistribution": {
					"1": {
						"count": 0,
						"percentage": 0
					},
					"2": {
						"count": 6,
						"percentage": 75
					},
					"3": {
						"count": 2,
						"percentage": 25
					}
				},
				"errorRate": 0,
				"totalSpam": 0,
				"channelDistribution": {
					"web": {
						"count": 8,
						"percentage": 100
					}
				},
				"peakUsageHours": {
					"0": 0,
					"1": 0,
					"2": 0,
					"3": 0,
					"4": 0,
					"5": 0,
					"6": 0,
					"7": 0,
					"8": 0,
					"9": 0,
					"10": 0,
					"11": 0,
					"12": 0,
					"13": 0,
					"14": 0,
					"15": 2,
					"16": 2,
					"17": 1,
					"18": 0,
					"19": 1,
					"20": 1,
					"21": 1,
					"22": 0,
					"23": 0
				},
				"weekdayDistribution": {
					"0": 0,
					"1": 0,
					"2": 0,
					"3": 8,
					"4": 0,
					"5": 0,
					"6": 0
				},
				"totalCost": 0.04351,
				"medianTotalCostPerConversation": 0.003955,
				"averageTotalCostPerConversation": 0.005439,
				"medianCostByCategory": {
					"llm": 0.002455,
					"tools": 0.006,
					"tracing": 0.00125
				},
				"averageCostByCategory": {
					"llm": 0.003126,
					"tools": 0.006,
					"tracing": 0.001563
				},
				"costDistribution": {
					"llm": {
						"cost": 0.02501,
						"percentage": 57.5
					},
					"tools": {
						"cost": 0.006,
						"percentage": 13.8
					},
					"tracing": {
						"cost": 0.0125,
						"percentage": 28.7
					}
				},
				"llmModelDistributionByTokens": {
					"gemini-2.5-flash": {
						"totalTokens": 31974,
						"percentage": 100
					}
				},
				"llmModelDistributionByCost": {
					"gemini-2.5-flash": {
						"cost": 0.02501,
						"percentage": 100
					}
				},
				"topExpensiveAccounts": [
					{
						"accountId": "6835074c12a92bf52a38c058",
						"accountName": "Psicologa Maria Paula test",
						"sessionCount": 1,
						"totalCost": 0.01522
					},
					{
						"accountId": "664be6c2c1334145b7408320",
						"accountName": "American Dental / Ardental Sas",
						"sessionCount": 1,
						"totalCost": 0.00723
					},
					{
						"accountId": "664e3981b581256a33115b04",
						"accountName": "Suquin Sas",
						"sessionCount": 1,
						"totalCost": 0.00501
					},
					{
						"accountId": "6500e5eb52c0659e67aa5f4a",
						"accountName": "Pilates Paola DR",
						"sessionCount": 1,
						"totalCost": 0.00462
					},
					{
						"accountId": "640245b3271d78d343f06d37",
						"accountName": "Gavel - Telas y Confecciones - Trapolimp",
						"sessionCount": 1,
						"totalCost": 0.00329
					},
					{
						"accountId": "664be8710155e2315e2191d9",
						"accountName": "Algofer Sas",
						"sessionCount": 1,
						"totalCost": 0.00292
					},
					{
						"accountId": "664bc637c1334145b73f4fa0",
						"accountName": "Fumigaciones Chao Cucarachas Sas",
						"sessionCount": 1,
						"totalCost": 0.00265
					},
					{
						"accountId": "664e5048e644e98902fc5164",
						"accountName": "Viviana Del Mar Hernandez",
						"sessionCount": 1,
						"totalCost": 0.00257
					}
				],
				"toolsDistributionByAmount": {
					"get_services": {
						"amount": 4,
						"percentage": 26.7
					},
					"generate_appointment_link": {
						"amount": 2,
						"percentage": 13.3
					},
					"get_products": {
						"amount": 4,
						"percentage": 26.7
					},
					"generate_purchase_link": {
						"amount": 1,
						"percentage": 6.7
					},
					"deepKnowledgeSearch": {
						"amount": 4,
						"percentage": 26.7
					}
				},
				"toolsDistributionByCost": {
					"get_services": {
						"cost": 0,
						"percentage": 0
					},
					"generate_appointment_link": {
						"cost": 0,
						"percentage": 0
					},
					"get_products": {
						"cost": 0,
						"percentage": 0
					},
					"generate_purchase_link": {
						"cost": 0,
						"percentage": 0
					},
					"deepKnowledgeSearch": {
						"cost": 0.006,
						"percentage": 100
					}
				},
				"agentsDistributionByAmount": {
					"services_agent": {
						"amount": 4,
						"percentage": 44.4
					},
					"products_agent": {
						"amount": 4,
						"percentage": 44.4
					},
					"knowledge_base_agent": {
						"amount": 1,
						"percentage": 11.1
					}
				},
				"agentsDistributionByCost": {
					"services_agent": {
						"cost": 0,
						"percentage": 0
					},
					"products_agent": {
						"cost": 0,
						"percentage": 0
					},
					"knowledge_base_agent": {
						"cost": 0,
						"percentage": 0
					}
				}
			},
			"dailyMetrics": [
				{
					"date": "2025-06-14",
					"totalConversations": 0,
					"conversationsWithIdentification": 0,
					"newClients": 0,
					"medianMessagesPerConversation": 0,
					"medianConversationDuration": 0,
					"resolutionRate": 0,
					"adjustedResolutionRate": 0,
					"medianUserFeeling": 0,
					"errorRate": 0,
					"spamCount": 0,
					"peakUsageHours": {
						"0": 0,
						"1": 0,
						"2": 0,
						"3": 0,
						"4": 0,
						"5": 0,
						"6": 0,
						"7": 0,
						"8": 0,
						"9": 0,
						"10": 0,
						"11": 0,
						"12": 0,
						"13": 0,
						"14": 0,
						"15": 0,
						"16": 0,
						"17": 0,
						"18": 0,
						"19": 0,
						"20": 0,
						"21": 0,
						"22": 0,
						"23": 0
					},
					"totalCost": 0,
					"medianTotalCostPerConversation": 0,
					"averageTotalCostPerConversation": 0,
					"medianCostByCategory": {
						"llm": 0,
						"tools": 0,
						"tracing": 0
					},
					"averageCostByCategory": {
						"llm": 0,
						"tools": 0,
						"tracing": 0
					},
					"costDistribution": {
						"llm": {
							"cost": 0,
							"percentage": 0
						},
						"tools": {
							"cost": 0,
							"percentage": 0
						},
						"tracing": {
							"cost": 0,
							"percentage": 0
						}
					},
					"llmModelDistributionByTokens": {},
					"llmModelDistributionByCost": {},
					"toolsDistributionByAmount": {},
					"toolsDistributionByCost": {},
					"agentsDistributionByAmount": {},
					"agentsDistributionByCost": {}
				},
				{
					"date": "2025-06-15",
					"totalConversations": 0,
					"conversationsWithIdentification": 0,
					"newClients": 0,
					"medianMessagesPerConversation": 0,
					"medianConversationDuration": 0,
					"resolutionRate": 0,
					"adjustedResolutionRate": 0,
					"medianUserFeeling": 0,
					"errorRate": 0,
					"spamCount": 0,
					"peakUsageHours": {
						"0": 0,
						"1": 0,
						"2": 0,
						"3": 0,
						"4": 0,
						"5": 0,
						"6": 0,
						"7": 0,
						"8": 0,
						"9": 0,
						"10": 0,
						"11": 0,
						"12": 0,
						"13": 0,
						"14": 0,
						"15": 0,
						"16": 0,
						"17": 0,
						"18": 0,
						"19": 0,
						"20": 0,
						"21": 0,
						"22": 0,
						"23": 0
					},
					"totalCost": 0,
					"medianTotalCostPerConversation": 0,
					"averageTotalCostPerConversation": 0,
					"medianCostByCategory": {
						"llm": 0,
						"tools": 0,
						"tracing": 0
					},
					"averageCostByCategory": {
						"llm": 0,
						"tools": 0,
						"tracing": 0
					},
					"costDistribution": {
						"llm": {
							"cost": 0,
							"percentage": 0
						},
						"tools": {
							"cost": 0,
							"percentage": 0
						},
						"tracing": {
							"cost": 0,
							"percentage": 0
						}
					},
					"llmModelDistributionByTokens": {},
					"llmModelDistributionByCost": {},
					"toolsDistributionByAmount": {},
					"toolsDistributionByCost": {},
					"agentsDistributionByAmount": {},
					"agentsDistributionByCost": {}
				},
				{
					"date": "2025-06-16",
					"totalConversations": 0,
					"conversationsWithIdentification": 0,
					"newClients": 0,
					"medianMessagesPerConversation": 0,
					"medianConversationDuration": 0,
					"resolutionRate": 0,
					"adjustedResolutionRate": 0,
					"medianUserFeeling": 0,
					"errorRate": 0,
					"spamCount": 0,
					"peakUsageHours": {
						"0": 0,
						"1": 0,
						"2": 0,
						"3": 0,
						"4": 0,
						"5": 0,
						"6": 0,
						"7": 0,
						"8": 0,
						"9": 0,
						"10": 0,
						"11": 0,
						"12": 0,
						"13": 0,
						"14": 0,
						"15": 0,
						"16": 0,
						"17": 0,
						"18": 0,
						"19": 0,
						"20": 0,
						"21": 0,
						"22": 0,
						"23": 0
					},
					"totalCost": 0,
					"medianTotalCostPerConversation": 0,
					"averageTotalCostPerConversation": 0,
					"medianCostByCategory": {
						"llm": 0,
						"tools": 0,
						"tracing": 0
					},
					"averageCostByCategory": {
						"llm": 0,
						"tools": 0,
						"tracing": 0
					},
					"costDistribution": {
						"llm": {
							"cost": 0,
							"percentage": 0
						},
						"tools": {
							"cost": 0,
							"percentage": 0
						},
						"tracing": {
							"cost": 0,
							"percentage": 0
						}
					},
					"llmModelDistributionByTokens": {},
					"llmModelDistributionByCost": {},
					"toolsDistributionByAmount": {},
					"toolsDistributionByCost": {},
					"agentsDistributionByAmount": {},
					"agentsDistributionByCost": {}
				},
				{
					"date": "2025-06-17",
					"totalConversations": 0,
					"conversationsWithIdentification": 0,
					"newClients": 0,
					"medianMessagesPerConversation": 0,
					"medianConversationDuration": 0,
					"resolutionRate": 0,
					"adjustedResolutionRate": 0,
					"medianUserFeeling": 0,
					"errorRate": 0,
					"spamCount": 0,
					"peakUsageHours": {
						"0": 0,
						"1": 0,
						"2": 0,
						"3": 0,
						"4": 0,
						"5": 0,
						"6": 0,
						"7": 0,
						"8": 0,
						"9": 0,
						"10": 0,
						"11": 0,
						"12": 0,
						"13": 0,
						"14": 0,
						"15": 0,
						"16": 0,
						"17": 0,
						"18": 0,
						"19": 0,
						"20": 0,
						"21": 0,
						"22": 0,
						"23": 0
					},
					"totalCost": 0,
					"medianTotalCostPerConversation": 0,
					"averageTotalCostPerConversation": 0,
					"medianCostByCategory": {
						"llm": 0,
						"tools": 0,
						"tracing": 0
					},
					"averageCostByCategory": {
						"llm": 0,
						"tools": 0,
						"tracing": 0
					},
					"costDistribution": {
						"llm": {
							"cost": 0,
							"percentage": 0
						},
						"tools": {
							"cost": 0,
							"percentage": 0
						},
						"tracing": {
							"cost": 0,
							"percentage": 0
						}
					},
					"llmModelDistributionByTokens": {},
					"llmModelDistributionByCost": {},
					"toolsDistributionByAmount": {},
					"toolsDistributionByCost": {},
					"agentsDistributionByAmount": {},
					"agentsDistributionByCost": {}
				},
				{
					"date": "2025-06-18",
					"totalConversations": 8,
					"conversationsWithIdentification": 3,
					"newClients": 2,
					"medianMessagesPerConversation": 2.5,
					"medianConversationDuration": 80,
					"resolutionRate": 37.5,
					"adjustedResolutionRate": 100,
					"medianUserFeeling": 2,
					"errorRate": 0,
					"spamCount": 0,
					"peakUsageHours": {
						"0": 0,
						"1": 0,
						"2": 0,
						"3": 0,
						"4": 0,
						"5": 0,
						"6": 0,
						"7": 0,
						"8": 0,
						"9": 0,
						"10": 0,
						"11": 0,
						"12": 0,
						"13": 0,
						"14": 0,
						"15": 2,
						"16": 2,
						"17": 1,
						"18": 0,
						"19": 1,
						"20": 1,
						"21": 1,
						"22": 0,
						"23": 0
					},
					"totalCost": 0.04351,
					"medianTotalCostPerConversation": 0.003955,
					"averageTotalCostPerConversation": 0.005439,
					"medianCostByCategory": {
						"llm": 0.002455,
						"tools": 0.006,
						"tracing": 0.00125
					},
					"averageCostByCategory": {
						"llm": 0.003126,
						"tools": 0.006,
						"tracing": 0.001563
					},
					"costDistribution": {
						"llm": {
							"cost": 0.02501,
							"percentage": 57.5
						},
						"tools": {
							"cost": 0.006,
							"percentage": 13.8
						},
						"tracing": {
							"cost": 0.0125,
							"percentage": 28.7
						}
					},
					"llmModelDistributionByTokens": {
						"gemini-2.5-flash": {
							"totalTokens": 31974,
							"percentage": 100
						}
					},
					"llmModelDistributionByCost": {
						"gemini-2.5-flash": {
							"cost": 0.02501,
							"percentage": 100
						}
					},
					"toolsDistributionByAmount": {
						"get_services": {
							"amount": 4,
							"percentage": 26.7
						},
						"generate_appointment_link": {
							"amount": 2,
							"percentage": 13.3
						},
						"get_products": {
							"amount": 4,
							"percentage": 26.7
						},
						"generate_purchase_link": {
							"amount": 1,
							"percentage": 6.7
						},
						"deepKnowledgeSearch": {
							"amount": 4,
							"percentage": 26.7
						}
					},
					"toolsDistributionByCost": {
						"get_services": {
							"cost": 0,
							"percentage": 0
						},
						"generate_appointment_link": {
							"cost": 0,
							"percentage": 0
						},
						"get_products": {
							"cost": 0,
							"percentage": 0
						},
						"generate_purchase_link": {
							"cost": 0,
							"percentage": 0
						},
						"deepKnowledgeSearch": {
							"cost": 0.006,
							"percentage": 100
						}
					},
					"agentsDistributionByAmount": {
						"services_agent": {
							"amount": 4,
							"percentage": 44.4
						},
						"products_agent": {
							"amount": 4,
							"percentage": 44.4
						},
						"knowledge_base_agent": {
							"amount": 1,
							"percentage": 11.1
						}
					},
					"agentsDistributionByCost": {
						"services_agent": {
							"cost": 0,
							"percentage": 0
						},
						"products_agent": {
							"cost": 0,
							"percentage": 0
						},
						"knowledge_base_agent": {
							"cost": 0,
							"percentage": 0
						}
					}
				}
			]
		}
	},
	"timestamp": "2025-07-01T15:39:36.647Z",
	"path": "/lite/v1/analytics?startDate=2025-06-19&endDate=2025-06-23&timezoneOffset=-5"
}