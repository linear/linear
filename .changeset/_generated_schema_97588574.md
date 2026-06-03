---
"@linear/sdk": major
---


feat(schema): [breaking] Field 'protected' was removed from object type 'Team' (Team.protected)

feat(schema): [breaking] Enum value 'protected' was removed from enum 'TeamVisibility' (TeamVisibility.protected)

feat(schema): [dangerous] Enum value 'restricted' was added to enum 'TeamVisibility' (TeamVisibility.restricted)

feat(schema): [non_breaking] Type 'DocumentContentAgentCheckpointMode' was added (DocumentContentAgentCheckpointMode)

feat(schema): [non_breaking] Type 'DocumentContentHistoryCheckpointType' was added (DocumentContentHistoryCheckpointType)

feat(schema): [non_breaking] Type 'DocumentContentHistoryTimelinePayload' was added (DocumentContentHistoryTimelinePayload)

feat(schema): [non_breaking] Field 'documentContentId' was added to object type 'DocumentContentHistoryType' (DocumentContentHistoryType.documentContentId)

feat(schema): [non_breaking] Field 'documentContentHistoryTimeline' was added to object type 'Query' (Query.documentContentHistoryTimeline)

feat(schema): [non_breaking] Field 'autoArchivedAt' was added to object type 'Release' (Release.autoArchivedAt)

feat(schema): [non_breaking] Field 'restrictedBy' was added to object type 'Team' (Team.restrictedBy)

feat(schema): [non_breaking] Field 'restrictedById' was added to object type 'Team' (Team.restrictedById)

feat(schema): [non_breaking] Field 'Team.visibility' description changed from 'The visibility of the team. Returns public for teams visible to all workspace members, private for teams visible only to members, and protected for non-private teams inside a private-team boundary.' to 'The visibility of the team. Returns public for teams visible to all workspace members, private for teams visible only to members, and restricted for non-private teams inside a private-team boundary.' (Team.visibility)

feat(schema): [non_breaking] Description 'A team is the primary organizational unit in Linear. Issues belong to teams, and each team has its own workflow states, cycles, labels, and settings. Teams can be public (visible to all workspace members), private (visible only to team members), or protected (visible only within an enclosing private-team boundary). Teams can also have sub-teams that inherit settings from their parent.' on type 'Team' has changed to 'A team is the primary organizational unit in Linear. Issues belong to teams, and each team has its own workflow states, cycles, labels, and settings. Teams can be public (visible to all workspace members), private (visible only to team members), or restricted (visible only within an enclosing private-team boundary). Teams can also have sub-teams that inherit settings from their parent.' (Team)

feat(schema): [non_breaking] Description 'The visibility of a team. A team can be public, private, or protected within an enclosing private-team boundary.' on type 'TeamVisibility' has changed to 'The visibility of a team. A team can be public, private, or restricted within an enclosing private-team boundary. The protected enum value remains as a legacy alias for compatibility.' (TeamVisibility)