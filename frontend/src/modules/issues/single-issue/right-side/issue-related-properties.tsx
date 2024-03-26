/* eslint-disable dot-location */
/** Copyright (c) 2024, Tegon, all rights reserved. **/

import { observer } from 'mobx-react-lite';
import React from 'react';

import { IssueRelatedDropdown } from 'modules/issues/components';
import { RelatedIssueItem } from 'modules/issues/components/related-issue-item';

import { type IssueType } from 'common/types/issue';
import {
  IssueRelationEnum,
  type IssueRelationType,
} from 'common/types/issue-relation';

import { useContextStore } from 'store/global-context-provider';

const TITLE_MAP = {
  [IssueRelationEnum.BLOCKS]: 'Blocking',
  [IssueRelationEnum.BLOCKED]: 'Blocked by',
  [IssueRelationEnum.DUPLICATE_OF]: 'Duplicate of',
  [IssueRelationEnum.RELATED]: 'Related',
};

interface RelatedIssue {
  relation: IssueRelationType;
  issue: IssueType;
}

export const IssueRelatedProperties = observer(() => {
  const { issueRelationsStore, issuesStore } = useContextStore();

  const getRelatedIssues = React.useCallback(
    (relationType: IssueRelationEnum) => {
      const relatedIssues = issueRelationsStore.issueRelations
        .filter(
          (relationAct: IssueRelationType) => relationAct.type === relationType,
        )
        .map((relationAct: IssueRelationType) => {
          return {
            issue: issuesStore.getIssueById(relationAct.relatedIssueId),
            relation: relationAct,
          };
        });

      return relatedIssues;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [issueRelationsStore, issuesStore],
  );

  const getComponent = (
    issueRelationType: IssueRelationEnum,
    index: number,
  ) => {
    if (issueRelationType === IssueRelationEnum.BLOCKS) {
      const relatedIssues = getRelatedIssues(IssueRelationEnum.BLOCKS);

      if (relatedIssues.length === 0) {
        return null;
      }

      return (
        <div
          className="flex justify-start items-start text-sm mb-4"
          key={index}
        >
          <div className="text-muted-foreground w-[95px] text-left my-2">
            {TITLE_MAP[issueRelationType as keyof typeof TITLE_MAP]}
          </div>
          <div className="w-[calc(100%_-_95px)]">
            <div className="flex items-center gap-2 flex-wrap">
              {relatedIssues.map(
                (relatedIssue: RelatedIssue, index: number) => (
                  <RelatedIssueItem
                    key={index}
                    issue={relatedIssue.issue}
                    relation={relatedIssue.relation}
                  />
                ),
              )}
            </div>
          </div>
        </div>
      );
    }

    if (issueRelationType === IssueRelationEnum.BLOCKED) {
      const relatedIssues = getRelatedIssues(IssueRelationEnum.BLOCKED);

      if (relatedIssues.length === 0) {
        return null;
      }

      return (
        <div
          className="flex justify-start items-start text-sm mb-4"
          key={index}
        >
          <div className="text-muted-foreground w-[95px] text-left my-2">
            {TITLE_MAP[issueRelationType as keyof typeof TITLE_MAP]}
          </div>
          <div className="w-[calc(100%_-_95px)]">
            <div className="flex flex-col items-start gap-1 flex-wrap">
              {relatedIssues.map(
                (relatedIssue: RelatedIssue, index: number) => (
                  <RelatedIssueItem
                    key={index}
                    issue={relatedIssue.issue}
                    relation={relatedIssue.relation}
                  />
                ),
              )}
            </div>
          </div>
        </div>
      );
    }

    if (issueRelationType === IssueRelationEnum.RELATED) {
      const relatedIssues = getRelatedIssues(IssueRelationEnum.RELATED);

      return (
        <div
          className="flex justify-start items-start text-sm mb-4"
          key={index}
        >
          <div className="text-muted-foreground w-[95px] text-left my-2">
            {TITLE_MAP[issueRelationType as keyof typeof TITLE_MAP]}
          </div>
          <div className="w-[calc(100%_-_95px)]">
            <div className="flex flex-col items-start gap-1 flex-wrap">
              {relatedIssues.map(
                (relatedIssue: RelatedIssue, index: number) => (
                  <RelatedIssueItem
                    key={index}
                    issue={relatedIssue.issue}
                    relation={relatedIssue.relation}
                  />
                ),
              )}
              <IssueRelatedDropdown />
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return Object.values(IssueRelationEnum).map(
    (issueRelationType: IssueRelationEnum, index: number) => {
      return getComponent(issueRelationType, index);
    },
  );
});